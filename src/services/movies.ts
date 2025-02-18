import { Movie, MovieWithTmdbId } from "../../types.js";
import prisma from "../prisma/client.js";
import compress from "../tmdb/compress.js";
import tmdb from "../tmdb/tmdb.js";
import valkey from "../valkey/operations.js";
import { MovieSchema } from "../zod/schemas.js";
import { Prisma } from "@prisma/client";

//prefer addMovieOrGetExistingInternalID in most cases to avoid error situations
const addMovie = async (tmdb_id: number) => {
  const addedMovie = await prisma.movie.create({
    data: {
      tmdb_id,
    },
  });
  return addedMovie.internal_movie_id;
};

const addMovieOrGetExistingInternalID = async (tmdb_id: number) => {
  try {
    const addedMovie = await prisma.movie.create({
      data: {
        tmdb_id,
      },
    });
    return addedMovie.internal_movie_id;
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      const movie = await prisma.movie.findFirstOrThrow({
        where: {
          tmdb_id: tmdb_id,
        },
        select: {
          internal_movie_id: true,
        },
      });
      return movie.internal_movie_id;
    } else {
      throw e;
    }
  }
};

const getMoviesByGroup = async (groupID: number) => {
  const moviesWithGroup = await prisma.watchGroup.findFirstOrThrow({
    where: {
      id: groupID,
    },
    include: {
      movies: true,
    },
  });

  const populated = await populateMovieDetails(moviesWithGroup.movies);

  const withDetails = {
    groupID: moviesWithGroup.id,
    name: moviesWithGroup.name,
    movies: populated,
  };

  return withDetails;
};

const fetchMovieDetails = async (
  internalID: number,
  tmdbID: number,
): Promise<Movie> => {
  const cachedDetails = await valkey.getMovie(internalID);

  if (!cachedDetails) {
    const compressedDetails = compress.movieResponse(
      await tmdb.getMovieDetails(tmdbID),
    );
    await valkey.setMovie(internalID, compressedDetails);
    return { ...compressedDetails, id: internalID };
  }
  const parsedDetails = MovieSchema.parse(JSON.parse(cachedDetails.toString()));

  return { ...parsedDetails, id: internalID };
};

const searchMovie = async (searchString: string): Promise<MovieWithTmdbId[] | null> => {
  return compress.MovieSearchResponse(await tmdb.searchByString(searchString));
};

const populateMovieDetails = async (
  movies: Array<{ internal_movie_id: number; tmdb_id: number }>,
): Promise<Movie[]> => {
  const arrayWithDetails = await Promise.all(
    movies.map(async ({ internal_movie_id, tmdb_id }) => {
      return await fetchMovieDetails(internal_movie_id, tmdb_id);
    }),
  );
  return arrayWithDetails;
};

export default {
  addMovie,
  addMovieOrGetExistingInternalID,
  getMoviesByGroup,
  fetchMovieDetails,
  populateMovieDetails,
  searchMovie,
};

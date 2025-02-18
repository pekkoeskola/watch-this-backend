import { MovieResponse, MovieResultsResponse } from "moviedb-promise";
import { MovieDetailsSchema, MovieSchema } from "../zod/schemas.js";
import { Movie, MovieDetails } from "../../types.js";
import { TMDBAPIError } from "../utils/errors.js";

const movieResponse = (object: MovieResponse): MovieDetails => {
  const compressed = { title: object.title, overview: object.overview };
  return MovieDetailsSchema.parse(compressed);
};

const MovieSearchResponse = (object: MovieResultsResponse): Movie[] => {
  if (object.results === undefined) {
    throw new TMDBAPIError("search response somehow still empty");
  }
  const compressed = object.results.map((movie) => {
    return MovieSchema.parse({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
    });
  });

  return compressed;
};

export default { movieResponse, MovieSearchResponse };

import { MovieResponse, MovieResultsResponse } from "moviedb-promise";
import { MovieSchema } from "../zod/schemas.js";
import { MovieDetails } from "../../types.js";

const movieResponse = (object: MovieResponse): MovieDetails => {
  const compressed = { title: object.title, overview: object.overview };
  return MovieSchema.parse(compressed);
};

const MovieSearchResponse = (
  object: MovieResultsResponse,
): MovieDetails[] | null => {
  if (object.results === undefined) {
    return null;
  }
  const compressed = object.results.map((movie) => {
    return MovieSchema.parse({
      title: movie.title,
      overview: movie.overview,
    });
  });

  return compressed;
};

export default { movieResponse, MovieSearchResponse };
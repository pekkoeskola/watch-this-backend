import { MovieResponse, MovieResultsResponse } from "moviedb-promise";
import { MovieSchema } from "../zod/schemas.js";
import { MovieDetails } from "../../types.js";
import { TMDBAPIError } from "../utils/errors.js";

const movieResponse = (object: MovieResponse): MovieDetails => {
  const compressed = { title: object.title, overview: object.overview };
  return MovieSchema.parse(compressed);
};

const MovieSearchResponse = (object: MovieResultsResponse): MovieDetails[] => {
  if (object.results === undefined) {
    throw new TMDBAPIError("search response somehow still empty");
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

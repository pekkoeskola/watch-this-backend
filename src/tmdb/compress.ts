import { MovieResponse } from "moviedb-promise";
import { MovieSchema } from "../zod/schemas.js";
import { MovieDetails } from "../../types.js";

const movieResponse = (object: MovieResponse): MovieDetails => {
  const compressed = { title: object.title, overview: object.overview };
  return MovieSchema.parse(compressed);
};

export default { movieResponse };

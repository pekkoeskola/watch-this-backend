import { MovieResponse } from "moviedb-promise";
import { MovieSchema } from "../zod/schemas.js";
import { Movie } from "../../types.js";

const movieResponse = (object: MovieResponse): Movie => {
  const compressed = { title: object.title };
  return MovieSchema.parse(compressed);
};

export default { movieResponse };

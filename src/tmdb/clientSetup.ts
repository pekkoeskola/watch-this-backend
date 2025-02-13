import "dotenv/config";
import { MovieDb } from "moviedb-promise";

if (process.env.TMDB_API_KEY === undefined) {
  throw new Error("api key not available");
}

const apiKey = process.env.TMDB_API_KEY;

const moviedb = new MovieDb(apiKey);

export default moviedb;

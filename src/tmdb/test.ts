import tmdb from "./tmdb.js";
import "dotenv/config";

if (process.env.TMDB_API_KEY === undefined) {
  throw new Error("api key not available");
}

tmdb
  .getMovieDetails(348)
  .then((res) => console.log(res))
  .catch((e) => {
    console.error(e);
  });

import moviedb from "./clientSetup.js";
import "dotenv/config";

if (process.env.TMDB_API_KEY === undefined) {
  throw new Error("api key not available");
}

moviedb
  .movieInfo(348)
  .then((res) => console.log(res))
  .catch((e) => {
    console.error(e);
  });

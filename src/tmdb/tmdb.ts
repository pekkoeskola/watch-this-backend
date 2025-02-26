import { TMDBAPIError } from "../utils/errors.js";
import moviedb from "./clientSetup.js";

const searchByString = (searchString: string) => {
  try {
    return moviedb.searchMovie({ query: searchString, page: 1 });
  } catch (e) {
    void e;
    throw new TMDBAPIError("Error searching for movie");
  }
};

const getMovieDetails = (id: number) => {
  try {
    return moviedb.movieInfo(id);
  } catch (e) {
    void e;
    throw new TMDBAPIError(
      "Error getting movie details: likely could not find movie with that id",
    );
  }
};

const getMoviePosterURL = async (posterAddress: string) => {
  //TODO: where should posterSize be determined? Here?
  const posterSize = "w92";
  const config = await moviedb.configuration();
  return `${config.images.base_url}${posterSize}${posterAddress}`;
};

export default { searchByString, getMovieDetails, getMoviePosterURL };

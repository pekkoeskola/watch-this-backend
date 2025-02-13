import moviedb from "./clientSetup.js";

const searchByString = (searchString: string) => {
  return moviedb.searchMovie({ query: searchString, page: 1 });
};

const getMovieDetails = (id: number) => {
  return moviedb.movieInfo(id);
};

export default { searchByString, getMovieDetails };

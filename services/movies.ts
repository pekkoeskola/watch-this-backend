import prisma from "../prisma/client.js";

const addMovie = async (tmdb_id: number) => {
  await prisma.movie.create({
    data: {
      tmdb_id,
    },
  });
};

const getMoviesByGroup = async (groupID: number) => {
  const moviesWithGroup = await prisma.watchGroup.findFirst({
    where: {
      id: groupID,
    },
    include: {
      movies: true,
    },
  });

  return moviesWithGroup;
};

export default { addMovie, getMoviesByGroup };

import prisma from "../prisma/client.js";

const addMovieToGroup = async (groupID: number, movieID: number) => {
  await prisma.movie.update({
    where: { internal_movie_id: movieID },
    data: {
      watch_groups: {
        connect: { id: groupID },
      },
    },
  });
};

export default { addMovieToGroup };

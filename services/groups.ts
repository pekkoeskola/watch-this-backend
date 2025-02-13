import prisma from "../prisma/client.js";

const addGroup = async (name: string) => {
  await prisma.watchGroup.create({
    data: {
      name,
    },
  });
};

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

export default { addGroup, addMovieToGroup };

import prisma from "../prisma/client.js";

const addGroup = async (name: string) => {
  await prisma.watchGroup.create({
    data: {
      name,
    },
  });
};

const addMovieToGroup = async (groupID: number, movieID: number) => {
  const addedMovie = await prisma.movie.update({
    where: { internal_movie_id: movieID },
    data: {
      watch_groups: {
        connect: { id: groupID },
      },
    },
  });
  return addedMovie;
};

const addUserToGroup = async (groupID: number, userID: number) => {
  await prisma.user.update({
    where: { id: userID },
    data: {
      watch_groups: {
        connect: { id: groupID },
      },
    },
  });
};

export default { addGroup, addMovieToGroup, addUserToGroup };

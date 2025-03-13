import { Rating } from "../../types.js";
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

const getRatings = async (groupID: number): Promise<Rating[]> => {
  const query = await prisma.rating.findMany({
    where: {
      user: {
        watch_groups: {
          some: {
            id: groupID,
          },
        },
      },
    },
  });
  return query.map(({ movie_id, user_id, rating }) => ({
    id: `m${movie_id}u${user_id}`,
    movieID: movie_id,
    userID: user_id,
    rating,
  }));
};

export default { addGroup, addMovieToGroup, addUserToGroup, getRatings };

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import userService from "../services/users.js";
import movieService from "../services/movies.js";
import groupService from "../services/groups.js";

async function main() {
  await userService.addUser("alice", "password");
  await userService.addUser("bob", "secret");

  await movieService.addMovie(1);
  await movieService.addMovie(2);
  await movieService.addMovie(3);

  await groupService.addGroup("group1");

  await groupService.addMovieToGroup(1, 1);
  await groupService.addMovieToGroup(1, 2);
  await groupService.addMovieToGroup(1, 3);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

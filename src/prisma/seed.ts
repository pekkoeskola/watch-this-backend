import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import userService from "../services/users.js";
import movieService from "../services/movies.js";
import groupService from "../services/groups.js";

async function main() {
  await userService.addUser("alice", "password");
  await userService.addUser("bob", "secret");
  await userService.addUser("Iida", "saskia");

  await movieService.addMovie(348);
  await movieService.addMovie(9361);
  await movieService.addMovie(11);

  await groupService.addGroup("group1");

  await groupService.addUserToGroup(1, 1);
  await groupService.addUserToGroup(1, 2);
  await groupService.addUserToGroup(1, 3);

  await groupService.addMovieToGroup(1, 1);
  await groupService.addMovieToGroup(1, 2);
  await groupService.addMovieToGroup(1, 3);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

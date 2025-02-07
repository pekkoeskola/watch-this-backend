import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import userService from "../services/users.js";

async function main() {
  await userService.addUser("alice", "password");
  await userService.addUser("bob", "secret");
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

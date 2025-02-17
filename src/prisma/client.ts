import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    user: {
      password_hash: true,
    },
  },
});

export default prisma;

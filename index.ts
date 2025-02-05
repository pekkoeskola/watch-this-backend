import "dotenv/config";
import express = require("express");

import prisma from "./prisma/client";

const app = express();

const dbtest = async () => {
  await prisma.user.create({
    data: {
      username: "Alice",
      password: "password",
    },
  });

  const users = await prisma.user.findMany();
  console.log(users);
};

void dbtest();

app.get("/", (_req, res) => {
  res.send("serves nothing at root, api is at /api");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

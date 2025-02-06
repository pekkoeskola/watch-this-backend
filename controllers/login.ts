import express = require("express");
import { UserSchema } from "../zod/schemas.js";
import prisma from "../prisma/client.js";
import argon from "@node-rs/argon2";
import { setSessionID } from "../valkey/transactions.js";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const data = UserSchema.parse(req.body);
  const { username, password } = data;

  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (user === null) {
    res.status(401).send();
    return;
  }
  const passwordCorrect = await argon.verify(
    user.password_hash as string,
    password,
  );
  if (!passwordCorrect) {
    res.status(401).send();
    return;
  }
  await setSessionID(user.id as number);
  res.status(200).send({ username });
});

export default loginRouter;

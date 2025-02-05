import express from "express";
import argon from "@node-rs/argon2";

import { NewUserSchema } from "../zod/schemas.js";
import prisma from "../prisma/client.js";

const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  const data = NewUserSchema.parse(req.body);
  const { username, password } = data;

  //TODO: configure argon for prod, currently using defaults

  const hash = await argon.hash(password);

  await prisma.user.create({
    data: {
      username: username,
      password_hash: hash,
    },
  });

  res.status(201).send();
});

export default userRouter;
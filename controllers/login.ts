import express = require("express");
import { UserSchema } from "../zod/schemas.js";
import prisma from "../prisma/client.js";
import argon from "@node-rs/argon2";
import { setSessionID } from "../valkey/operations.js";
import { Response } from "express";
import Cookies from "cookies";

const loginRouter = express.Router();

declare module "express-serve-static-core" {
  interface Response {
    cookies: Cookies;
  }
}

loginRouter.post("/", async (req, res: Response) => {
  try {
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
    const passwordCorrect = await argon.verify(user.password_hash, password);
    if (!passwordCorrect) {
      res.status(401).send();
      return;
    }
    const sessionID = await setSessionID(user.id);
    //TODO: change options for prod
    res.cookies.set("id", sessionID, { httpOnly: false, secure: false, signed: false});
    res.status(200).send({ username });
  } catch (e) {
    console.error(e);
  }
});

export default loginRouter;

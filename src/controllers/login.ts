import express = require("express");
import { UserSchema } from "../zod/schemas.js";
import prisma from "../prisma/client.js";
import argon from "@node-rs/argon2";
import valkey from "../valkey/operations.js";
import { Request, Response } from "express";
import { CachedUser } from "../../types.js";
import authService from "../services/auth.js";

const loginRouter = express.Router();

loginRouter.get("/", (req, res: Response<CachedUser>) => {
  const authenticatedUser = req.user;
  if (!authenticatedUser) {
    res.redirect("/login");
    return;
  }
  res.send(authenticatedUser);
  return;
});

loginRouter.post("/", async (req, res: Response) => {
  //TODO: massive controller, move logic to service or overall reason to consider splitting code into routes and controllers?
  try {
    const data = UserSchema.parse(req.body);
    const { username, password } = data;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
      omit: {
        password_hash: false,
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
    const sessionID = await valkey.setSessionID(user.id, user.username);
    //TODO: change options for prod, expires currently in wrong time zone (edit: seems like it doesn't actually, but test)
    res.cookies.set("id", sessionID, {
      httpOnly: false,
      secure: false,
      signed: false,
      expires: new Date(Date.now() + 15 * 60000),
    });
    res.status(200).send({ username: user.username, id: user.id });
    return;
  } catch (e) {
    console.error(e);
  }
});

//DELETE request to /login used to log out
loginRouter.delete("/", async (req: Request, res) => {
  const user = req.user;
  const sessionID = req.cookies.get("id");
  //TODO: this is a silly amount of checks that can be removed through a redesign of the auth middleware
  if (!user || !sessionID || !(await authService.logOut(sessionID))) {
    res.status(400).json({
      error: "Session already expired or you have already logged out",
    });
    return;
  }
  res.status(200).json({ success: "Logged out succesfully" });

  return;
});

export default loginRouter;

import express, { Request, Response } from "express";

import { UserSchema } from "../zod/schemas.js";
import userService from "../services/users.js";
import { z } from "zod";
import prisma from "../prisma/client.js";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const data = UserSchema.parse(req.body);
    const { username, password } = data;

    const newUser = await userService.addUser(username, password);

    res.status(201).json(newUser);
    return;
  } catch (e) {
    next(e);
  }
});

userRouter.get("/:userID/groups", async (req: Request, res: Response) => {
  const authenticatedUser = req.user;
  const userID = z.number().parse(req.params.userID);
  if (!authenticatedUser || authenticatedUser !== userID) {
    res.status(401).send();
    return;
  }
  const groups = await prisma.user.findMany({
    where: {
      id: authenticatedUser,
    },
    select: {
      id: true,
      username: true,
      watch_groups: true
    }
  });
  res.json(groups);
});

export default userRouter;

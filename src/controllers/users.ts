import express, { Request, Response } from "express";

import { UserSchema } from "../zod/schemas.js";
import userService from "../services/users.js";
import { z } from "zod";
import { Group } from "../../types.js";

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

userRouter.get("/:userID/groups", async (req: Request, res: Response<Group[]>) => {
  //TODO: reconsider authentication and authorization, userID comparison is practically redundant (as long as this is intended only to fetch user's own groups)
  const authenticatedUser = req.user;
  const userID = z.coerce.number().parse(req.params.userID);
  if (!authenticatedUser) {
    res.status(401).send();
    return;
  }
  const groups = await userService.getUserGroups(userID);
  res.json(groups);
  return;
});

export default userRouter;

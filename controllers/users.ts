import express from "express";

import { UserSchema } from "../zod/schemas.js";
import userService from "../services/users.js";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const data = UserSchema.parse(req.body);
    const { username, password } = data;

    const newUser = await userService.addUser(username, password);

    res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
});

export default userRouter;

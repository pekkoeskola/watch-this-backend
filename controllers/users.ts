import express from "express";

import { UserSchema } from "../zod/schemas.js";
import userService from "../services/users.js";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const data = UserSchema.parse(req.body);
    const { username, password } = data;

    await userService.addUser(username, password);

    res.status(201).send();
  } catch (e) {
    next(e);
  }
});

export default userRouter;

import express, { Request, Response } from "express";
import { coerceToNumber } from "../zod/schemas.js";
import movieService from "../services/movies.js";
import groupService from "../services/groups.js";

const ratingsRouter = express.Router();

ratingsRouter.get(
  "/group/:groupID",
  async (req: Request, res: Response) => {
    //FIXME:configure auth properly
    const groupID = coerceToNumber(req.params.groupID);
    const ratings = await groupService.getRatings(groupID);

    res.json(ratings);
    return;
  },
);

ratingsRouter.get(
  "/movie/:movieID/group/:groupID",
  async (req: Request, res: Response) => {
    //FIXME:configure auth properly
    const movieID = coerceToNumber(req.params.movieID);
    const groupID = coerceToNumber(req.params.groupID);
    const ratings = await movieService.getRatings(movieID, groupID);

    res.json(ratings);
    return;
  },
);

ratingsRouter.post(
  "/movie/:movieID/user/userID",
  async (req: Request, res: Response) => {
    const movieID = coerceToNumber(req.params.movieID);
    const userID = coerceToNumber(req.params.userID);
    const preference = coerceToNumber(req.params.rating);
    //FIXME:configure auth properly
    if (!req.user || req.user.id !== userID) {
      res.status(401).send();
      return;
    }

    await movieService.addRating(movieID, userID, preference);
  },
);

export default ratingsRouter;

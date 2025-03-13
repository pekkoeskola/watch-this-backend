import express, { Request, Response } from "express";
import { coerceToNumber } from "../zod/schemas.js";
import movieService from "../services/movies.js";
import groupService from "../services/groups.js";
import { z } from "zod";
import { Rating } from "../../types.js";

const ratingsRouter = express.Router();

ratingsRouter.get("/groups/:groupID", async (req: Request, res: Response<Rating[]>) => {
  //FIXME:configure auth properly
  const groupID = coerceToNumber(req.params.groupID);
  const ratings = await groupService.getRatings(groupID);

  res.json(ratings);
  return;
});

ratingsRouter.get(
  "/movies/:movieID/groups/:groupID",
  async (req: Request, res: Response) => {
    //FIXME:configure auth properly
    const movieID = coerceToNumber(req.params.movieID);
    const groupID = coerceToNumber(req.params.groupID);
    const ratings = await movieService.getRatings(movieID, groupID);

    res.json(ratings);
    return;
  },
);

//TODO: reconsider using url parameters at least for POST requests and move IDs into body?
ratingsRouter.post(
  "/movies/:movieID/users/userID",
  async (req: Request, res: Response) => {
    const movieID = coerceToNumber(req.params.movieID);
    const userID = coerceToNumber(req.params.userID);
    //FIXME: more elegant validation here (avoid silencing eslint)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const preference = z.number().parse(req.body.ratings);
    //FIXME:configure auth properly
    if (!req.user || req.user.id !== userID) {
      res.status(401).send();
      return;
    }

    await movieService.addRating(movieID, userID, preference);
    res.status(201).send();
    return;
  },
);

export default ratingsRouter;

import express, { Request, Response } from "express";
import movieService from "../services/movies.js";
import { z } from "zod";
import { coerceToNumber } from "../zod/schemas.js";

const movieRouter = express.Router();

movieRouter.get("/", async (req: Request, res: Response) => {
  //TODO: better validation?
  const searchKeyword = z.coerce.string().parse(req.query.keyword);

  const movies = await movieService.searchMovie(searchKeyword);

  res.json(movies);
});

movieRouter.post(
  "/:movieID/group/:groupID/user/:userID/watchpreference/:preference",
  async (req, res) => {
    const movieID = coerceToNumber(req.params.movieID);
    const groupID = coerceToNumber(req.params.groupID);
    const userID = coerceToNumber(req.params.userID);
    const preference = coerceToNumber(req.params.preference);
    //FIXME:configure auth properly
    if (!req.user || req.user.id !== userID) {
      res.status(401).send();
      return;
    }

    await movieService.addWatchPreference(movieID, groupID, userID, preference);
  },
);

movieRouter.post(
  "/:movieID/user/:userID/rating/:rating",
  async (req, res) => {
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

export default movieRouter;

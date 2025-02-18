import express = require("express");

import movieService from "../services/movies.js";

import { Response } from "express";
import { Movie } from "../../types.js";
import groupService from "../services/groups.js";
import { coerceToNumber } from "../zod/schemas.js";

const groupsRouter = express.Router();

groupsRouter.get(
  "/:groupID/movies",
  async (req, res: Response<Movie[]>, next) => {
    try {
      const groupID = req.params.groupID;

      const groupWithMovies = await movieService.getMoviesByGroup(
        Number(groupID),
      );

      res.json(groupWithMovies.movies);
      return;
    } catch (e) {
      next(e);
    }
  },
);

groupsRouter.post("/:groupID/movies:tmdbID", async (req, res, next) => {
  try {
    const tmdbID = coerceToNumber(req.params.tmdbID);
    const groupID = coerceToNumber(req.params.groupID);

    const internalID =
      await movieService.addMovieOrGetExistingInternalID(tmdbID);
    const addedMovie = await groupService.addMovieToGroup(groupID, internalID);

    res.json(addedMovie);
  } catch (e) {
    next(e);
  }
});

export default groupsRouter;

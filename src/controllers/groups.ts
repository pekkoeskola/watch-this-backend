import express = require("express");

import movieService from "../services/movies.js";

import { Response } from "express";
import { Movie } from "../../types.js";

const groupsRouter = express.Router();

groupsRouter.get("/:groupID/movies", async (req, res: Response<Movie[]>, next) => {
  try {
    const groupID = req.params.groupID;

    const groupWithMovies = await movieService.getMoviesByGroup(Number(groupID));

    res.json(groupWithMovies.movies);
    return;
  } catch (e) {
    next(e);
  }
});

export default groupsRouter;

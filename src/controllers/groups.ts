import express = require("express");

import movieService from "../services/movies.js";

const groupsRouter = express.Router();

groupsRouter.get("/:groupID/movies", async (req, res, next) => {
  try {
    const groupID = req.params.groupID;

    const movies = await movieService.getMoviesByGroup(Number(groupID));
    void movies;

    res.json(movies);
    return;
  } catch (e) {
    next(e);
  }
});

export default groupsRouter;

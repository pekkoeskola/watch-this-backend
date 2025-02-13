import express = require("express");

import movieService from "../services/movies.js";

const groupsRouter = express.Router();

groupsRouter.get("/:groupID/movies", async (req, res) => {
  const groupID = req.params.groupID;

  const movies = await movieService.getMoviesByGroup(Number(groupID));

  res.json(movies);
});

import express, { Request, Response } from "express";
import movieService from "../services/movies.js";
import { z } from "zod";

const movieRouter = express.Router();

movieRouter.get("/", async (req: Request, res: Response) => {
  //TODO: better validation?
  const searchKeyword = z.coerce.string().parse(req.query.keyword);

  const movies = await movieService.searchMovie(searchKeyword);

  res.json(movies);
});

export default movieRouter;
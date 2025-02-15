import { Prisma } from "@prisma/client";
import type { ErrorRequestHandler } from "express";
import { TMDBAPIError } from "./errors.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error.message);
    res.status(400).send();
  }
  if (error instanceof TMDBAPIError) {
    console.error(error.message);
    res.status(500).send();
  }
  console.error("unknown error");

  next(error);
};

export default errorHandler;

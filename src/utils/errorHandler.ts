import { Prisma } from "@prisma/client";
import type { ErrorRequestHandler } from "express";
import { TMDBAPIError } from "./errors.js";
import { logError } from "./logger.js";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    logError(error.message);
    res.status(400).send();
    return;
  }
  if (error instanceof TMDBAPIError) {
    logError(error.message);
    res.status(500).send();
    return;
  }
  if (error instanceof ZodError) {
    logError("uncaught ZodError");
    logError(ZodError);
    res.status(500).send();
  }
  logError("unknown error");

  next(error);
};

export default errorHandler;

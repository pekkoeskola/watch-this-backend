import { Prisma } from "@prisma/client";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error.message);
    res.status(400).send();
  }
  console.log("unknown error");

  next(error);
};

export default errorHandler;

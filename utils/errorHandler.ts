import { Prisma } from "@prisma/client";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, _req, _res, next) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error.message);
  }

  next(error);
};

export default errorHandler;

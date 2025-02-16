import { RequestHandler, Request } from "express";
import auth from "../services/auth.js";
import { z } from "zod";

const authenticateUser: RequestHandler = async (req: Request, _res, next) => {
  const sessionID = req.cookies.get("id");
  if(sessionID !== undefined){
    const userID = await auth.authenticateUser(sessionID);
    if (userID !== null) {
      req.user = z.number().parse(userID.toString());
    }
  }
  next();
};

export default { authenticateUser };

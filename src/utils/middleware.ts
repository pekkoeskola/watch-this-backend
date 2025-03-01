import { RequestHandler, Request } from "express";
import auth from "../services/auth.js";


//TODO: improve upon this, add at least group attribute
const authenticateUser: RequestHandler = async (req: Request, _res, next) => {
  const sessionID = req.cookies.get("id");
  if(sessionID !== undefined){
    const user = await auth.authenticateUser(sessionID);
    if (user !== null) {
      req.user = user;
    }
  }
  next();
};

export default { authenticateUser };

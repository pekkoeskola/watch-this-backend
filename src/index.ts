import "dotenv/config";
import express = require("express");
import userRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import errorHandler from "./utils/errorHandler.js";
import groupsRouter from "./controllers/groups.js";
import movieRouter from "./controllers/movies.js";
import Cookies from "cookies";
import middleware from "./utils/middleware.js";
import ratingsRouter from "./controllers/ratings.js";

const app = express();

app.use(Cookies.express([""]));

app.use(express.json());

app.use(middleware.authenticateUser);

const apiRouter = express.Router();

apiRouter.use("/groups", groupsRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/login", loginRouter);
apiRouter.use("/movies", movieRouter);
apiRouter.use("/ratings", ratingsRouter);

app.use("/api", apiRouter);

//app.use("/groups", groupsRouter);

app.get("/", (_req, res) => {
  res.send("serves nothing at root, api is at /api");
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

import "dotenv/config";
import express = require("express");
import userRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

const apiRouter = express.Router();

app.use(express.json());

apiRouter.use("/users", userRouter);
apiRouter.use("/login", loginRouter);

app.use("/api", apiRouter);

app.get("/", (_req, res) => {
  res.send("serves nothing at root, api is at /api");
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

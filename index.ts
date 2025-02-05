import "dotenv/config";
import express = require("express");

const app = express();

const apiRouter = express.Router();

app.use("/api", apiRouter);

app.get("/", (_req, res) => {
  res.send("serves nothing at root, api is at /api");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

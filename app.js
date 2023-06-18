require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const noticeBoardRouter = require("./routerModule");
const noticeBoardMiddleware = require("./noticeboardRouterMiddlewere");

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME
});

const app = express();

app.use(express.json());

app.use("/", noticeBoardMiddleware, noticeBoardRouter);

app.use((error, req, res, next) => {
  res.send(error.message);
});

app.listen(process.env.PORT, () => console.log("server started"));
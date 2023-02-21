const express = require("express");
const usersRouter = require("./users.router");
const authRouter = require("./auth.router");
const { checkApiKey } = require("../middlewares/auth.handler");

function routerApi(app) {
  const router = express.Router();

  app.use("/api/v1", checkApiKey, router);

  router.use("/users", usersRouter);
  router.use("/auth", authRouter);
}

module.exports = routerApi;

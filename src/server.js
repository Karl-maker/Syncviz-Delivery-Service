const express = require("express");
const { websockets, router } = require("./controller");
const bodyParser = require("body-parser");
const passport = require("passport");
const jsonParser = bodyParser.json();
const errorHandler = require("./middleware/error-handler");
const wrapper = require("./middleware/wrapper");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = async function entryPoint(io, app) {
  require("./auth/passport");

  app.use(passport.initialize());
  app.use(urlencodedParser);
  app.use(jsonParser);
  app.use("/api", router);
  app.use("*", (req, res, next) => {
    next({ name: "NotFound", message: "Resource Not Found" });
  });
  app.use(errorHandler);

  io.use(wrapper(passport.initialize()));
  websockets(io);
};

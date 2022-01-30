const express = require("express");
const { websockets, router } = require("./controller");
const bodyParser = require("body-parser");
const passport = require("passport");
const jsonParser = bodyParser.json();
const errorHandler = require("./middleware/error-handler");
const wrapper = require("./middleware/wrapper");
//TRY
const config = require("./config");
const next = require("next");
const dev = config.environment.NODE_ENV !== "production";
const next_app = next({ dev });
const handle = next_app.getRequestHandler();
const { parse } = require("url");
//...
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = async function entryPoint(io, app) {
  require("./auth/passport");

  next_app.prepare().then(() => {
    app.use(passport.initialize());
    app.use(urlencodedParser);
    app.use(jsonParser);
    app.use("/api", router);

    // All routes not captured by /api will end up going to app

    app.get("/", (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      return next_app.render(req, res, "/", query);
    });

    app.get("*", (req, res, next) => {
      return handle(req, res);
    });
    app.use(errorHandler);
  });

  io.use(wrapper(passport.initialize()));
  websockets(io);
};

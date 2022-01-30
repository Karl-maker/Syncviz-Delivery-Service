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
const logger = require("./log/server");
//...
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = async function entryPoint(io, app) {
  require("./auth/passport");

  app.use(passport.initialize());
  app.use(urlencodedParser);
  app.use(jsonParser);
  app.use("/api", router);

  await next_app
    .prepare()
    .then(() => {
      logger.info({ message: "Next.js App Prepared" });
    })
    .catch((e) => {
      logger.error(e);
    });

  app.get("/", (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    next_app.render(req, res, "/", query);
  });

  app.get("*", (req, res, next) => {
    handle(req, res);
  });

  app.use(errorHandler);
  io.use(wrapper(passport.initialize()));
  websockets(io);
};

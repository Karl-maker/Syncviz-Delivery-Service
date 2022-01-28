const morgan = require("morgan");
const json = require("morgan-json");

const logger = require("./server.js");

// Setup Tokens

morgan.token(
  "ip",
  (req) =>
    (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
    req.socket.remoteAddress
);
morgan.token("user", (req) => {
  if (req.user) {
    return req.user.email;
  }
  return "visitor";
});

// Logger format

const format = json({
  method: ":method",
  endpoint: ":url",
  status: ":status",
  ip: ":ip",
  user: ":user",
  responseTime: ":response-time",
});

const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const { method, endpoint, status, ip, user, responseTime } =
        JSON.parse(message);

      logger.info("HTTP Access Log", {
        user,
        ip,
        method,
        endpoint,
        status: Number(status),
        timestamp: new Date().toString(),
        responseTime: Number(responseTime),
      });
    },
  },
});

module.exports = httpLogger;

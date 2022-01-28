const winston = require("winston");
const config = require("../config");

const options = {
  file: {
    level: "warn",
    filename: config.debug.LOG_FILE,
    handleExceptions: true,
    json: true,
    maxsize: config.debug.LOG_MAXSIZE,
    maxFiles: config.debug.LOG_MAXFILES,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        }),
        winston.format.timestamp()
      ),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;

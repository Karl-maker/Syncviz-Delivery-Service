require("dotenv-flow").config({
  silent: true,
});
const fs = require("fs");
const path = require("path");
const ENV = process.env;
var LOG_LOCATION;

const readENVFile = (location) => {
  try {
    return fs.readFileSync(path.resolve(__dirname, location), "utf8");
  } catch (err) {
    // No File Detected
    console.log(err);
  }
};

const ACCESS_KEYS = JSON.parse(ENV.ACCESS_KEYS);

try {
  LOG_LOCATION = path.resolve(__dirname, ENV.LOG_FILE);
} catch (err) {
  LOG_LOCATION = path.resolve(__dirname, "../../logs/errors.log");
}

const variables = {
  environment: {
    NODE_ENV: ENV.NODE_ENV || "development",
  },

  resources: {
    CONTAINER_PATH: ENV.CONTAINER_PATH || "container", // From root
  },

  server: {
    PROTOCOL: ENV.PROTOCOL || "http",
    HOST: ENV.HOST || "localhost",
    PORT: ENV.PORT || 3000,
    URL: ENV.URL || "localhost:5000",
  },

  debug: {
    LOG_FILE: LOG_LOCATION,
    LOG_MAXFILES: ENV.LOG_MAXFILES || 5,
    LOG_MAXSIZE: ENV.LOG_MAXSIZE || 5242880,
  },

  db: {
    URI: ENV.DB_URI,
    USER: ENV.DB_USER,
    PASSWORD: ENV.DB_PASSWORD,
  },

  email: {
    SERVICE: ENV.EMAIL_SERVICE || "Gmail",
    ADDRESS: ENV.EMAIL_ADDRESS,
    PASSWORD: ENV.EMAIL_PASSWORD,
  },

  technician: {
    EMAIL: ENV.TECHNICIAN_EMAIL,
  },

  bcrypt: {
    SALTORROUNDS: ENV.SALTORROUNDS || 10,
  },

  jwt: {
    ISSUER: ENV.JWT_ISSUER || "Syncviz",
    ALGORITHM: ENV.JWT_ALGORITHM || "RS256",
    IS_HTTPS: ENV.JWT_IS_HTTPS || false,
    REFRESH_TOKEN_LIFE: ENV.REFRESH_TOKEN_LIFE || 90,
    ACCESS_TOKEN_LIFE: ENV.ACCESS_TOKEN_LIFE || 10000,
    ACCESS_TOKEN_PUBLIC_KEY: ACCESS_KEYS.public,
    ACCESS_TOKEN_PRIVATE_KEY: ACCESS_KEYS.private,
    REFRESH_TOKEN_PUBLIC_KEY: ENV.REFRESH_TOKEN_PUBLIC_KEY || "NOT_AVALIABLE",
    REFRESH_TOKEN_PRIVATE_KEY: ENV.REFRESH_TOKEN_PRIVATE_KEY || "NOT_AVALIABLE",
  },

  reset_password: {
    TOKEN: { EXPIRATION: 3600 }, // In seconds
  },

  client: {
    URL: ENV.CLIENT_URL || "localhost:8000",
  },

  nodeGeocoder: {
    PROVIDER: ENV.NODEGEOCODER_PROVIDER || "openstreetmap",
  },
};

const config = { ...variables };

module.exports = config;

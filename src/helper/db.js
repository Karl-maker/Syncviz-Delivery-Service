const mongoose = require("mongoose");
const logger = require("../log/server");
const config = require("../config");

//............. DB MODELS.............................

// Create the database connection

const DB_URI = config.db.URI;
const DB_USER = config.db.USER || null;
const DB_PASSWORD = config.db.PASSWORD || null;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      user: DB_USER,
      pass: DB_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    logger.error({
      message: `${err.message}`,
      timestamp: `${new Date().toString()}`,
    });
  }
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  logger.info({
    message: "Mongoose default connection is open",
    timestamp: `${new Date().toString()}`,
  });
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  logger.error({
    message: "Mongoose default connection error: " + err,
    timestamp: `${new Date().toString()}`,
  });
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  logger.info({
    message: "Mongoose default connection disconnected",
    timestamp: `${new Date().toString()}`,
  });
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logger.info({
      message:
        "Mongoose default connection disconnected through app termination",
      timestamp: `${new Date().toString()}`,
    });
    process.exit(0);
  });
});

//..............Central access point to all db models.....................

module.exports = { connectDB };

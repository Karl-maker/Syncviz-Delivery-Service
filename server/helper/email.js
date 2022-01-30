const config = require("../config");
const nodemailer = require("nodemailer");
const logger = require("../log/server");

function connectTransporter() {
  try {
    const transporter = nodemailer.createTransport({
      service: config.email.SERVICE,
      auth: {
        user: config.email.ADDRESS,
        pass: config.email.PASSWORD,
      },
    });

    return transporter;
  } catch (err) {
    logger.error(err);
    return null;
  }
}

module.exports = connectTransporter;

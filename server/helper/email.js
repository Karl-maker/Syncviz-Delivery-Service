const config = require("../config");
const nodemailer = require("nodemailer");
const logger = require("../log/server");

const transporter = nodemailer.createTransport({
  service: config.email.SERVICE,
  auth: {
    user: config.email.ADDRESS,
    pass: config.email.PASSWORD,
  },
});

module.exports = transporter;

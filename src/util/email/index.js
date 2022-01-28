const transporter = require("../../helper/email");
const handlebars = require("handlebars");
const hsb = require("nodemailer-express-handlebars");
const fs = require("fs");
const path = require("path");
const config = require("../../config");

function readHTMLFile(location) {
  try {
    return fs.readFileSync(path.resolve(__dirname, location), "utf8");
  } catch (err) {
    // No File Detected
    throw new Error({ name: "UnexpectedError", message: err });
  }
}

function sendEmail(to, subject, payload, template) {
  const html = readHTMLFile(`./templates/${template}.html`);

  var template = handlebars.compile(html);

  var htmlToSend = template(payload);

  try {
    var mailOptions = {
      from: config.email.ADDRESS,
      to: to,
      subject: subject,
      html: htmlToSend,
      attachments: [
        {
          filename: "logo512.png",
          path: path.resolve(__dirname, "./templates/img/logo512.png"),
          cid: "logo",
        },
      ],
    };
  } catch (err) {
    throw new Error({ name: "UnexpectedError", message: err });
  }

  transporter.sendMail(mailOptions);
}

module.exports = {
  sendEmail,
};

const { User, Token } = require("../../model");
const config = require("../../config");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const clientURL = config.client.URL;
const bcryptSalt = config.bcrypt.SALTORROUNDS;
const { sendEmail } = require("../../util/email");

module.exports = {
  resetPassword,
  requestPasswordReset,
  confirmUserEmail,
  sendConfirmationEmail,
};

async function sendConfirmationEmail(email) {
  // Create Token

  let confirmationToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(confirmationToken, Number(bcryptSalt));

  // Save In Tokens

  let current_token = await Token.findOne({ email: email });
  if (current_token) await current_token.deleteOne();

  await new Token({
    email: email,
    token: hash,
    createdAt: Date.now(),
  }).save();

  await sendEmail(
    email,
    "Confirm Email",
    {
      link: `${config.server.URL}/auth/confirm-email?token=${confirmationToken}&email=${email}`,
    },
    "confirmEmail"
  );
  return;
}

async function confirmUserEmail(email, token) {
  let confirmationToken = await Token.findOne({ email });

  if (!confirmationToken) {
    throw new Error({
      name: "NotFound",
      message: "Invalid or expired password reset token",
    });
  }
  const isValid = await bcrypt.compare(token, confirmationToken.token);
  if (!isValid) {
    throw new Error({
      name: "NotFound",
      message: "Invalid or expired password reset token",
    });
  }

  await User.updateOne({ email: email }, { is_confirmed: true });

  return;
}

async function requestPasswordReset(email) {
  const user = await User.findOne({ email });

  if (!user)
    throw new Error({ name: "NotFound", message: "User does not exist" });
  let token = await Token.findOne({ email: user.email });
  if (token) await token.deleteOne();
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    email: user.email,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user.email}`;
  sendEmail(
    user.email,
    "Reset Password",
    { user: { first_name: user.first_name }, link: link },
    "requestResetPassword"
  );
  return link;
}

async function resetPassword(email, token, password) {
  let passwordResetToken = await Token.findOne({ email });
  if (!passwordResetToken) {
    throw new Error({
      name: "NotFound",
      message: "Invalid or expired password reset token",
    });
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error({
      name: "NotFound",
      message: "Invalid or expired password reset token",
    });
  }
  const hash = await bcrypt.hash(password, Number(bcryptSalt));
  await User.updateOne(
    { email: email },
    { $set: { password: hash } },
    { new: true }
  );
  const user = await User.findOne({ email: email });
  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.first_name,
    },
    "resetPassword"
  );
  await passwordResetToken.deleteOne();
  return true;
}

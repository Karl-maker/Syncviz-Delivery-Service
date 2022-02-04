const mongoose = require("mongoose");
const config = require("../../config");

const EXPIRE = config.reset_password.TOKEN.EXPIRATION;

const TokenSchema = new mongoose.Schema({
  token: { type: String },
  email: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: EXPIRE, // this is the expiry time in seconds
  },
});

const Token = mongoose.model("Tokens", TokenSchema);

module.exports = Token;

const jwt = require("jsonwebtoken");
const config = require("../config");

function getAccessTokenFromHeader(req) {
  let access_token =
    req.headers["x-access-token"] || req.headers["authorization"];

  // Remove Bearer from string
  access_token = access_token.replace(/^Bearer\s+/, "");

  return access_token;
}

async function createAccessToken(user) {
  const body = {
    _id: user._id,
    email: user.email,
    account_type: user.account_type,
    permission_level: user.permission_level,
  };
  const access_token = await jwt.sign(
    { user: body },
    config.jwt.ACCESS_TOKEN_PRIVATE_KEY,
    {
      expiresIn: config.jwt.ACCESS_TOKEN_LIFE,
      algorithm: config.jwt.ALGORITHM,
    }
  );

  return access_token;
}

module.exports = {
  getAccessTokenFromHeader,
  createAccessToken,
};

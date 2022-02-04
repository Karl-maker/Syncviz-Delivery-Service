const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../../../auth/jwt");
const config = require("../../../config");
const { auth } = require("../../../service");

function authenticationController(io) {
  router.post(
    `/register`,
    passport.authenticate("signup", { session: false }),
    registerUser
  );
  router.get("/confirm-email", confirmUser);
  router.post("/login", loginUser);
  router.post("/request-reset-password/:email", requestResetUserPassword);
  router.post("/send-confirmation-email/:email", sendConfirmationEmail);
  router.post("/reset-password/:email", resetUserPassword);

  return router;

  // Functions that will link to services

  function sendConfirmationEmail(req, res, next) {
    var { email } = req.params;
    auth
      .sendConfirmationEmail(email)
      .then(() => {
        res.status(200).json({ message: "Check Email" });
      })
      .catch((err) => {
        next(err);
      });
  }

  function confirmUser(req, res, next) {
    var { email, token } = req.query;
    auth
      .confirmUserEmail(email, token)
      .then(() => {
        res.redirect(`${config.client.PROTOCOL}://${config.client.URL}/login`);
      })
      .catch((err) => {
        next(err);
      });
  }

  function registerUser(req, res, next) {
    res
      .status(200)
      .json({ user: req.user, message: "Registration Successful" });
  }

  async function loginUser(req, res, next) {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (!user) {
          const error = {
            name: "NotFound",
            message: "User Not Found",
          };

          return next(error);
        }

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const access_token = await createAccessToken(user);

          return res.status(200).json({ access_token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }

  function requestResetUserPassword(req, res, next) {
    const email = req.params.email;
    auth
      .requestPasswordReset(email)
      .then((link) => {
        res.status(200).json({ message: "Check Email" });
      })
      .catch((err) => {
        next(err);
      });
  }

  function resetUserPassword(req, res, next) {
    const email = req.params.email;
    auth
      .resetPassword(email, req.body.token, req.body.password)
      .then((link) => {
        res.status(200).json({ message: "Check Email" });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = { authenticationController };

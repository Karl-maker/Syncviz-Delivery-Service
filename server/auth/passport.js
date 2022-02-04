const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const config = require("../config");
const { User, Token } = require("../model");
const { auth } = require("../service");
const { getAccessTokenFromHeader } = require("./jwt");
const { sendEmail } = require("../util/email");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const bcryptSalt = config.bcrypt.SALTORROUNDS;

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.create({
          email: email.toLowerCase(),
          password,
        });

        await auth.sendConfirmationEmail(user.email);

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email }).select({
          password: 1,
          email: 1,
          first_name: 1,
          last_name: 1,
          account_type: 1,
        });

        if (!user) {
          return done(null, false, {
            name: "NotFound",
            message: "No account created with that email",
          });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {
            name: "Unauthorized",
            message: "Email or Password is not correct",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: config.jwt.ACCESS_TOKEN_PUBLIC_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      algorithm: [config.jwt.ALGORITHM],
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

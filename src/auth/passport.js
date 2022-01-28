const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const config = require("../config");

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

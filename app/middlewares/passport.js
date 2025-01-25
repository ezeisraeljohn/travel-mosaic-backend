const { TokenExpiredError } = require("jsonwebtoken");
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const LocalStrategy = require("passport-local");
const User = require("../models");
const { verifyPassword } = require("../utils/helpers");
const jwt = require("jsonwebtoken");
const {
  getUserByEmailQuery,
} = require("../resources/Users/Queries/users.query");
const logger = require("../utils/logger");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await getUserByEmailQuery(email);
        if (!user) {
          return done(null, false);
        }
        const isValid = verifyPassword(password, user.password);
        if (!isValid) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        logger.error(`Error finding user ${error}`, {
          stack: error.stack,
        });
        return done(error);
      }
    }
  )
);

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return done(null, false, { message: "Token expired" });
      }
      return done(error);
    }
  })
);

module.exports = passport;

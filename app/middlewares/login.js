const AuthenticactionError = require("../utils/Errors/authenticationError");
const passport = require("passport");
const logger = require("../utils/logger");

const verifyUserLocal = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      logger.error(`Error finding user ${err}`, {
        stack: err.stack,
      });
      return next(err);
    }
    if (!user) {
      next(new AuthenticactionError("Invalid Credentials", 401));
    }
    req.user = user;
    next(); // Pass control to the next middleware (login controller)
  })(req, res, next);
};

const verifyUserBearer = (req, res, next) => {
  passport.authenticate("bearer", { session: false }, (err, user, info) => {
    if (err) {
      logger.error(`Error finding user ${err}`, {
        stack: err.stack,
      });
      return next(err);
    }
    if (!user) {
      next(new AuthenticactionError("Invalid Credentials", 401));
    }
    req.user = user;
    next(); // Pass control to the next middleware (login controller)
  })(req, res, next);
};

const verifyUserGoogle = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      next(new AuthenticactionError("Invalid Credentials", 401));
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { verifyUserLocal, verifyUserGoogle, verifyUserBearer };

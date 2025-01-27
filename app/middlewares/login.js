const AuthenticactionError = require("../utils/Errors/authenticationError");
const passport = require("passport");

const verifyUser = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      next(new AuthenticactionError("Invalid email or password", 401));
    }
    req.user = user;
    next(); // Pass control to the next middleware (login controller)
  });
};

module.exports = { verifyUser };

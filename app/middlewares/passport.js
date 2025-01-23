const { TokenExpiredError } = require("jsonwebtoken");
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");
const LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false);
        }
        const isValid = await user.isValidPassword(password);
        if (!isValid) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
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

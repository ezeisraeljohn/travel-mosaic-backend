const express = require("express");
const { signup, login } = require("../controllers/authentication.controller");
const AuthenticactionError = require("../../../utils/Errors/authenticationError");
const {
  signupSchema,
  loginSchema,
} = require("../Validators/authentication.validator");
const { validate } = require("../../../middlewares/validateData");
const passport = require("passport");

const router = express.Router();
router.post("/signup", validate(signupSchema), signup);
router.post(
  "/login",
  validate(loginSchema),
  (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        next(new AuthenticactionError("Invalid email or password", 401));
      }
      req.user = user;
      next(); // Pass control to the next middleware (login controller)
    })(req, res, next); // Invoke the middleware with req, res, and next
  },
  login
);

module.exports = router;

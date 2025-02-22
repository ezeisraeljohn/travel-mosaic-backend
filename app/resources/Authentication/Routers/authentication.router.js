const express = require("express");
const { signup, login } = require("../controllers/authentication.controller");
const {
  verifyUserLocal,
  verifyUserGoogle,
} = require("../../../middlewares/login");
const {
  signupSchema,
  loginSchema,
} = require("../Validators/authentication.validator");
const { validate } = require("../../../middlewares/validateData");
const passport = require("passport");

const router = express.Router();
//Local login
router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), verifyUserLocal, login);

//Google OAuth2 login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/login/google", verifyUserGoogle, login);

module.exports = router;

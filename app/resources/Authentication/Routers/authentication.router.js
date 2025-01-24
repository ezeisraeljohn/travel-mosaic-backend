const express = require("express");
const { signup } = require("../controllers/authentication.controller");
const { signupSchema } = require("../Validators/authentication.validator");
const { validate } = require("../../../middlewares/validateData");

const router = express.Router();
router.post("/signup", validate(signupSchema), signup);

module.exports = router;

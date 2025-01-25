const yup = require("yup");
const { response } = require("../../../utils/helpers");

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid Email")
    .required("Email field is required"),
  password: yup
    .string()
    .min(8, "Must be at least 8 characters long")
    .required("Password is required"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid Email")
    .required("Email field is required"),
  password: yup
    .string()
    .min(8, "Must be at least 8 characters long")
    .required("Password is required"),
});

module.exports = { signupSchema, loginSchema };

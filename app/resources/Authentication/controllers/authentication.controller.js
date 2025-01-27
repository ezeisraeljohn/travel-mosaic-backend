const {
  loginService,
  signupService,
} = require("../Services/authentication.service");
const { response } = require("../../../utils/responses");
/**
 * @description - The Signup controller that registers the user into the system.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {Object} - The response object.
 */
const signup = async (req, res, next) => {
  try {
    const result = await signupService(req, res, next);
    return response(result)("User")(res);
  } catch (error) {
    next(error);
  }
};

/**
 * @description - The Login controller that logs the user into the system.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object.
 */
const login = async (req, res, next) => {
  try {
    const result = await loginService(req, res, next);
    return response(result)("Authentication")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };

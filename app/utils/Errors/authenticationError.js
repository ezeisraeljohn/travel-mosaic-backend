const BaseError = require("./baseError");

class AuthenticationError extends BaseError {
  constructor(message = "Authentication Failed") {
    super("AuthenticationError", message, 401);
  }
}

module.exports = AuthenticationError;

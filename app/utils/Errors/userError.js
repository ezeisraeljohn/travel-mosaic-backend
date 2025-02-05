const BaseError = require("./baseError");

class UserError extends BaseError {
  constructor(message = "User Error", status = 400, details = null) {
    super("UserError", message, status, details);
  }
}

module.exports = UserError;

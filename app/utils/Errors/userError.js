const BaseError = require("./baseError");

class UserError extends BaseError {
  constructor(message = "User Error", status = 400, details = null) {
    super(message, status, details);
    this.name = "UserError";
  }
}

module.exports = UserError;

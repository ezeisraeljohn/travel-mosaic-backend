const BaseError = require("./baseError");

class ValidationError extends BaseError {
  constructor(errors) {
    super("ValidationError", "Validation Failed", 422, errors);
  }
}

module.exports = ValidationError;

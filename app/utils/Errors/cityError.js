const BaseError = require("./baseError");

class CityError extends BaseError {
  constructor(message, statusCode) {
    super("CityError", message, statusCode);
  }
}

module.exports = CityError;

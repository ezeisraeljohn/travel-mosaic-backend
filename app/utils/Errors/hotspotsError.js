const BaseError = require("./baseError");

class HotspotsError extends BaseError {
  constructor(message, statusCode) {
    super("HotspotsError", message, statusCode);
  }
}

module.exports = HotspotsError;

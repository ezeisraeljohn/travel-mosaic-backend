const BaseError = require("./baseError");

class TripError extends BaseError {
  constructor(message, status, details = null) {
    super("TripError", message, status, details);
    this.name = "TripError";
  }
}

module.exports = TripError;

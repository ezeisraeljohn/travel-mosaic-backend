const BaseError = require("./baseError");

class ItineraryError extends BaseError {
  constructor(message = "Bad request", status = 400, details = null) {
    super("ItineraryError", message, status, details);
  }
}

module.exports = ItineraryError;

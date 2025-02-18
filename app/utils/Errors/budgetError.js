const BaseError = require("./baseError");

class BudgetError extends BaseError {
  constructor(message = "Bad request", status = 400, details = null) {
    super("BudgetError", message, status, details);
  }
}

module.exports = BudgetError;

const BaseError = require("./baseError");

class QuestionnaireError extends BaseError {
  constructor(message, status, details = null) {
    super("QuestiionnaireERror", message, status, details);
  }
}

module.exports = QuestionnaireError;

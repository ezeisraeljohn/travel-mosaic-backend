const BaseError = require("./baseError");

class QuestionnaireError extends BaseError {
  constructor(message, status, details = null) {
    super(message, status, details);
    this.name = "QuestionnaireError";
  }
}

module.exports = QuestionnaireError;

const { createQuestionnaireQuery } = require("../Queries/questionnaire.query");
const QuestionnaireError = require("../../../utils/Errors/questionnaireError");
const { returnFromService } = require("../../../utils/responses");
const createQuestionnaireService = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new QuestionnaireError("User not available", 401);
    }
    const questionnaire = await createQuestionnaireQuery({
      ...req.body,
      userId: req.user.id,
    });
    return returnFromService(201)(true)("Questionnaire")(
      "Questionnaire created successfully"
    )(questionnaire);
  } catch (error) {
    throw error;
  }
};

module.exports = { createQuestionnaireService };

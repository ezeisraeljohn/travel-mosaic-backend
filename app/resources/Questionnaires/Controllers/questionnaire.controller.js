const {
  createQuestionnaireService,
  getQuestionnairesService,
} = require("../Services/questionnaire.service");
const { response } = require("../../../utils/responses");

const createQuestionnaire = async (req, res, next) => {
  try {
    const questionnaire = await createQuestionnaireService(req, res, next);
    return response(questionnaire)("Questionnaire")(res);
  } catch (error) {
    next(error);
  }
};

const getQuestionnaires = async (req, res, next) => {
  try {
    const questionnaires = await getQuestionnairesService(req, res, next);
    return response(questionnaires)("Questionnaires")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = { createQuestionnaire, getQuestionnaires };

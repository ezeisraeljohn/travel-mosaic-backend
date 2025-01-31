const {
  QuestionnaireResponse,
  QuestionnaireQuestion,
  QuestionnaireOption,
} = require("../../../models");

const createQuestionnaireQuery = async (data) => {
  try {
    const questionnaireResponse = await QuestionnaireResponse.create(data);
    return questionnaireResponse;
  } catch (error) {
    throw error;
  }
};

const getQuestionnairesQuery = async (userId) => {
  try {
    const questionnaires = await QuestionnaireQuestion.findAll({
      include: [
        {
          model: QuestionnaireOption,
          as: "options",
        },
      ],
    });
    return questionnaires;
  } catch (error) {
    throw error;
  }
};

module.exports = { createQuestionnaireQuery, getQuestionnairesQuery };

const { QuestionnaireResponse } = require("../../../models");

const createQuestionnaireQuery = async (data) => {
  try {
    const questionnaireResponse = await QuestionnaireResponse.create(data);
    return questionnaireResponse;
  } catch (error) {
    throw error;
  }
};

module.exports = { createQuestionnaireQuery };

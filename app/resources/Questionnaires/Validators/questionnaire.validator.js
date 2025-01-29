const yup = require("yup");
const user = require("../../../models/user");

const createQuestionnaireResponseSchema = yup.object().shape({
  questionId: yup.string().required("questionId is required"),
  optionId: yup.string().required("optionId is required"),
  isSkipped: yup.boolean().notRequired("isSkipped is required"),
});

module.exports = { createQuestionnaireResponseSchema };

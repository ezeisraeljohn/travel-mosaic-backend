const {
  createQuestionnaire,
  getQuestionnaires,
} = require("../Controllers/questionnaire.controller");
const {
  createQuestionnaireResponseSchema,
} = require("../Validators/questionnaire.validator");
const { validate } = require("../../../middlewares/validateData");
const { verifyUserBearer } = require("../../../middlewares/login");

const express = require("express");
const router = express.Router();

router.post(
  "/questionnaire",
  validate(createQuestionnaireResponseSchema),
  verifyUserBearer,
  createQuestionnaire
);

router.get("/questionnaire", verifyUserBearer, getQuestionnaires);
module.exports = router;

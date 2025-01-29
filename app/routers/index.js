const AuthenticationRouuter = require("../resources/Authentication/Routers/authentication.router");
const QuestionnaireRouter = require("../resources/Questionnaires/Routers/questionnaire.router");
const express = require("express");

const router = (app) => {
  app.use("/api/v1", AuthenticationRouuter);
  app.use("/api/v1", QuestionnaireRouter);
};

module.exports = router;

const AuthenticationRouuter = require("../resources/Authentication/Routers/authentication.router");
const express = require("express");

const router = (app) => {
  app.use("/api/v1", AuthenticationRouuter);
};

module.exports = router;

const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const passport = require("passport");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(errorHandler);
module.exports = app;

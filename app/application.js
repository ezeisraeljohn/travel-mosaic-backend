const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const passport = require("passport");
const express = require("express");
const router = require("./routers");
const app = express();
require("./middlewares/passport");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
router(app);
app.use(errorHandler);

module.exports = app;

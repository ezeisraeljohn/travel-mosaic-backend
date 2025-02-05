const express = require("express");
const { verifyUserBearer } = require("../../../middlewares/login");
const { validateQuery } = require("../../../middlewares/validateData");
const { QueryCitiesSchema } = require("../validators/validator.cities");

const router = express.Router();

const { getCities } = require("../Controllers/cities.controller");

router.get(
  "/cities",
  validateQuery(QueryCitiesSchema),
  verifyUserBearer,
  getCities
);
// router.get("/cities/:id", verifyUserBearer, getCities);

module.exports = router;

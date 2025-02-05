const express = require("express");
const { createTripsSchema } = require("../Validators/trips.validators");
const { createTrips, getTrips } = require("../Controllers/trips.controller");
const { verifyUserBearer } = require("../../../middlewares/login");
const { validate } = require("../../../middlewares/validateData");

const router = express.Router();

router.post(
  "/trips",
  validate(createTripsSchema),
  verifyUserBearer,
  createTrips
);
router.get("/trips", verifyUserBearer, getTrips);

module.exports = router;

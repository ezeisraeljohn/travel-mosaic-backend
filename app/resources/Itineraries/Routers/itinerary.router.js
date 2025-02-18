const {
  createItinerary,
  getItineraries,
  updateItinerary,
} = require("../Controllers/itinerary.controller");
const express = require("express");
const { verifyUserBearer } = require("../../../middlewares/login");
const {
  validate,
  validateQuery,
} = require("../../../middlewares/validateData");
const {
  createItinerarySchema,
  getItinerariesQuery,
} = require("../Validators/itinerary.validator");
const router = express.Router();

router.post(
  "/itineraries",
  validate(createItinerarySchema),
  verifyUserBearer,
  createItinerary
);

router.get(
  "/itineraries",
  validateQuery(getItinerariesQuery),
  verifyUserBearer,
  getItineraries
);

router.put(
  "/itineraries/:id",
  validate(createItinerarySchema),
  verifyUserBearer,
  updateItinerary
);
module.exports = router;

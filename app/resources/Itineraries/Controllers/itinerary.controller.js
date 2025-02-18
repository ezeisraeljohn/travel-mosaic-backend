const {
  createItineraryService,
  getItinerariesService,
  updateItinerariesService,
} = require("../Services/itinerary.service");
const { response } = require("../../../utils/responses");
const logger = require("../../../utils/logger");

const createItinerary = async (req, res, next) => {
  try {
    const itinerary = await createItineraryService(req, res, next);
    return response(itinerary)("Itinerary")(res);
  } catch (error) {
    logger.error("Error creating itinerary", error);
    next(error);
  }
};

const getItineraries = async (req, res, next) => {
  try {
    const itineraries = await getItinerariesService(req, res, next);
    return response(itineraries)("Itinerary")(res);
  } catch (error) {
    logger.error("Error creating itinerary", error);
    next(error);
  }
};

const updateItinerary = async (req, res, next) => {
  try {
    const itinerary = await updateItinerariesService(req, res, next);
    return response(itinerary)("Itinerary")(res);
  } catch (error) {
    logger.error("Error updating itinerary", error);
    next(error);
  }
};

module.exports = { createItinerary, getItineraries, updateItinerary };

const {
  createItineraryQuery,
  getItinerariesQuery,
  updateItineraryQuery,
  getItineraryByIdQuery,
} = require("../Queries/itinerary.query");
const { returnFromService } = require("../../../utils/responses");
const { getTripByIdQuery } = require("../../Trips/Queries/trips.query");
const TripError = require("../../../utils/Errors/tripError");
const ItineraryError = require("../../../utils/Errors/itineraryError");

const createItineraryService = async (req, res, next) => {
  try {
    const trip = await getTripByIdQuery(req.body.tripId);
    if (!trip) {
      throw new TripError("Trip not found", 404);
    }
    const itinerary = await createItineraryQuery({
      ...req.body,
    });
    return returnFromService(201)(true)("Itinerary")(
      "Itinerary created successfully"
    )(itinerary);
  } catch (error) {
    throw error;
  }
};

const getItinerariesService = async (req, res, next) => {
  try {
    const tripId = req.query.tripId;
    const trip = await getTripByIdQuery(tripId);
    if (!trip) {
      throw new TripError("Trip not found", 404);
    }
    if (trip.userId !== req.user.id) {
      throw new TripError("Unauthorized", 401);
    }
    const itineraries = await getItinerariesQuery({ tripId });
    return returnFromService(200)(true)("Itinerary")(
      "Itineraries fetched successfully"
    )(itineraries);
  } catch (error) {
    throw error;
  }
};

const updateItinerariesService = async (req, res, next) => {
  try {
    const tripId = req.body.tripId;
    const trip = await getTripByIdQuery(tripId);
    if (!trip) {
      throw new TripError("Trip not found", 404);
    }
    if (trip.userId !== req.user.id) {
      throw new TripError("Unauthorized", 401);
    }
    const itinerary = await getItineraryByIdQuery(req.params.id);
    if (!itinerary) {
      throw new ItineraryError("Itinerary not found", 404);
    }
    const updatedItinerary = await updateItineraryQuery({
      ...req.body,
      id: req.params.id,
      updatedAt: new Date(),
    });
    return returnFromService(200)(true)("Itinerary")(
      "Itinerary updated successfully"
    )(updatedItinerary);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createItineraryService,
  updateItinerariesService,
  getItinerariesService,
};

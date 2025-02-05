const {
  createTripsService,
  getTripsService,
} = require("../Services/trips.services");
const { response } = require("../../../utils/responses");

const createTrips = async (req, res, next) => {
  try {
    const result = await createTripsService(req, res, next);
    return response(result)("Trip")(res);
  } catch (error) {
    next(error);
  }
};

const getTrips = async (req, res, next) => {
  try {
    const result = await getTripsService(req, res, next);
    return response(result)("Trip")(res);
  } catch (error) {
    next(error);
  }
};
module.exports = { createTrips, getTrips };

const { createTripsQuery, getTripsQuery } = require("../Queries/trips.query");
const { returnFromService } = require("../../../utils/responses");
const { User } = require("../../../models");

const createTripsService = async (req, res, next) => {
  try {
    const trip = await createTripsQuery({ userId: req.user.id, ...req.body });
    return returnFromService(201)(true)("Trip")("Trip created successfully")(
      trip.toJSON()
    );
  } catch (error) {
    throw error;
  }
};

const getTripsService = async (req, res, next) => {
  try {
    const query = { userId: req.user.id };
    const trips = await getTripsQuery(query);
    return returnFromService(200)(true)("Trip")("Trips fetched successfully")(
      trips.trips
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTripsService,
  getTripsService,
};

const { Trip } = require("../../../models");

const createTripsQuery = async (trip) => {
  try {
    const newTrip = await Trip.create(trip);
    return newTrip;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTripsQuery = async (query) => {
  try {
    const trips = await Trip.findAll({ where: { ...query } });
    return { trips };
  } catch (error) {
    throw error;
  }
};

const getTripByIdQuery = async (tripId) => {
  try {
    return await Trip.findByPk(tripId);
  } catch (error) {
    throw error;
  }
};

module.exports = { createTripsQuery, getTripsQuery, getTripByIdQuery };

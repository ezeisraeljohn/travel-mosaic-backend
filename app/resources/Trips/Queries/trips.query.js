const { Trip } = require("../../../models");

const createTripsQuery = async (trip) => {
  try {
    console.log(trip);
    const newTrip = await Trip.create(trip);
    return newTrip;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTripsQuery = async (userId) => {
  try {
    const trips = await Trip.findAll({ where: { userId } });
    return { trips };
  } catch (error) {
    throw error;
  }
};

module.exports = { createTripsQuery, getTripsQuery };

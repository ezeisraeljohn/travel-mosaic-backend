const { Itinerary, Hotspot } = require("../../../models");
const { up } = require("../../../seeders/20250202005642-unnamed-seeder");
const logger = require("../../../utils/logger");

const createItineraryQuery = async (itineraryData) => {
  try {
    return await Itinerary.create(itineraryData);
  } catch (error) {
    throw error;
  }
};

const getItinerariesQuery = async (query) => {
  try {
    return await Itinerary.findAll({
      where: { ...query },
      include: {
        model: Hotspot,
        as: "hotspotDetails",
      },
    });
  } catch (error) {
    throw error;
  }
};

const getItineraryByIdQuery = async (id) => {
  try {
    return await Itinerary.findByPk(id);
  } catch (error) {
    throw error;
  }
};

const updateItineraryQuery = async (itineraryData) => {
  try {
    const itinerary = await Itinerary.findByPk(itineraryData.id);
    return await itinerary.update(itineraryData);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createItineraryQuery,
  getItinerariesQuery,
  updateItineraryQuery,
  getItineraryByIdQuery,
};

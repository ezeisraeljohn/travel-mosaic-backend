const { response } = require("../../../utils/responses");
const { getCitiesService } = require("../Services/cities.service");

/**
 *@description - The getCities controller that fetches all cities from the database.ZZq
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns
 */
const getCities = async (req, res, next) => {
  try {
    const cities = await getCitiesService(req, res, next);
    return response(cities)("City")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCities };

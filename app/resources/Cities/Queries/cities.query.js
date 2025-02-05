const { where, Op } = require("sequelize");
const { City } = require("../../../models");
const { Country } = require("../../../models");

const getCitiesQuery = async (req) => {
  try {
    return City.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${req.query.name}%` } },
          {
            "$cityCountry.name$": { [Op.iLike]: `%${req.query.name}%` },
          },
          {
            state: { [Op.iLike]: `%${req.query.name}%` },
          },
        ],
      },
      include: {
        model: Country,
        as: "cityCountry",
        required: true,
      },
      limit: 100,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCityLongAndLatQuery = async (cityId) => {
  try {
    return City.findOne({
      where: {
        id: cityId,
      },
      attributes: ["latitude", "longitude"],
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCityByIdQuery = async (cityId) => {
  try {
    return City.findOne({
      where: {
        id: cityId,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getCitiesQuery, getCityByIdQuery, getCityLongAndLatQuery };

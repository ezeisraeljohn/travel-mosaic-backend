const { getCitiesQuery } = require("../Queries/cities.query");
const { returnFromService } = require("../../../utils/responses");
const { User } = require("../../../models");
const { getUserByIdQuery } = require("../../Users/Queries/users.query");

const getCitiesService = async (req, res, next) => {
  try {
    const user = await getUserByIdQuery(req.user.id);
    if (!user) {
      throw new UserError("User not Available", 401);
    }
    const cities = await getCitiesQuery(req);
    return returnFromService(200)(true)("City")("Cities fetched successfully")(
      cities
    );
  } catch (error) {
    throw error;
  }
};

module.exports = { getCitiesService };

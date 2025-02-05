const { response } = require("../../../utils/responses");
const { getHotspotsService } = require("../Services/hotspots.service");

const getHotspots = async (req, res, next) => {
  try {
    const result = await getHotspotsService(req, res, next);
    return response(result)("Hotspot")(res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getHotspots };

const { Hotspot } = require("../../../models");
const { returnFromService } = require("../../../utils/responses");
const UserError = require("../../../utils/Errors/userError");
const { getUserByIdQuery } = require("../../Users/Queries/users.query");
const { getCityLongAndLatQuery } = require("../../Cities/Queries/cities.query");
const { getOSMQuery } = require("../Queries/hotspot.query");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const HotspotsError = require("../../../utils/Errors/hotspotsError");
const {
  getCategoryByIdQuery,
} = require("../../HotspotsCategory/Queries/hotspotsCategory.query");
const {
  extractHotspotData,
  cleanHotspotData,
} = require("../../../utils/helpers");
const CityError = require("../../../utils/Errors/cityError");

const getHotspotsService = async (req, res, next) => {
  try {
    const { cityId, categoryId } = req.query;
    const user = await getUserByIdQuery(req.user.id);
    if (!user) {
      throw new UserError("User not Available", 401);
    }
    const longAndLat = await getCityLongAndLatQuery(cityId);
    if (!longAndLat) {
      throw new CityError("City not found", 404);
    }
    const category = await getCategoryByIdQuery(categoryId);
    if (!category) {
      throw new HotspotsError("Category not found", 404);
    }
    const OsmQuery = getOSMQuery(
      longAndLat.latitude,
      longAndLat.longitude,
      category.value
    );
    const osmResponse = await axios.get(process.env.OSM_API_URL, {
      params: {
        data: OsmQuery,
      },
    });
    const places = osmResponse.data.elements;
    if (places.length === 0) {
      throw new HotspotsError("No Hotspots found", 404);
    }
    let hotspotsData = await extractHotspotData(places, req.query);
    hotspotsData = cleanHotspotData(hotspotsData);
    const dbHotspotData = await Hotspot.bulkCreate(hotspotsData, {
      updateOnDuplicate: [
        "name",
        "lat",
        "lng",
        "address",
        "rating",
        "num_reviews",
        "tags",
        "image",
        "city_id",
        "description",
      ],
      validate: true,
      returning: true,
    });
    const plainHotspots = dbHotspotData
      .map((hotspot) => {
        const hostpotData = hotspot.toJSON();
        return {
          ...hostpotData,
          tags: JSON.parse(hostpotData.tags),
        };
      })
      .filter((hotspot) => {
        return hotspot.image !== null && hotspot.name !== "Unknown";
      });
    return returnFromService(200)(true)("Hotspot")(
      "Hotspots fetched successfully"
    )(plainHotspots);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getHotspotsService,
};

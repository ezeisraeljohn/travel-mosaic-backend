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
const city = require("../../../models/city");
const { validate } = require("uuid");

const getHotspotsService = async (req, res, next) => {
  try {
    const { cityId, categoryId } = req.query;
    const user = await getUserByIdQuery(req.user.id);
    if (!user) {
      throw new UserError("User not Available", 401);
    }
    const longAndLat = await getCityLongAndLatQuery(cityId);
    const category = await getCategoryByIdQuery(categoryId);
    const OsmQuery = getOSMQuery(
      longAndLat.latitude,
      longAndLat.longitude,
      category.value
    );
    console.log(OsmQuery);
    const osmResponse = await axios.get(process.env.OSM_API_URL, {
      params: {
        data: OsmQuery,
      },
    });
    const places = osmResponse.data.elements;
    if (places.length === 0) {
      throw new HotspotsError("No Hotspots found", 404);
    }
    let hotspotsData = await Promise.all(
      places.map(async (place) => {
        const {
          id,
          tags,
          lat = place?.center?.lat,
          lon = place?.center?.lat,
        } = place;
        const name = tags.name || "Unknown";
        const address = tags["addr:street"] || tags["addr:full"] || "Unknown";
        const osmUrl = `https://www.openstreetmap.org/node/${id}`;
        let image = tags.image || null;
        let description = "No description available";
        if (!image && tags.wikidata) {
          try {
            const wikiResponse = await axios.get(
              `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=descriptions|claims&ids=${tags.wikidata}&languages=en`
            );
            const entities = wikiResponse.data.entities;

            // Get description
            if (entities[tags.wikidata]?.descriptions?.en) {
              description = entities[tags.wikidata].descriptions.en.value;
              console.log(description);
            }

            // Get image
            const claims = entities[tags.wikidata]?.claims;
            if (claims?.P18) {
              const filename = claims.P18[0].mainsnak.datavalue.value;
              image = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
                filename
              )}`;
            }
          } catch (error) {
            console.warn(`No Wikimedia data found for ${name}`);
          }
        }
        let rating = null;
        let num_reviews = null;
        let reviews = [];
        if (!reviews.length) {
          reviews = [];
        }
        rating =
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length;
        num_reviews = reviews.length;
        return {
          osmId: id,
          osmUrl: osmUrl,
          name,
          category: category.id,
          lat,
          lng: lon,
          address,
          rating: rating || 0,
          num_reviews,
          cityId,
          image,
          tags: JSON.stringify(tags),
          description,
        };
      })
    );
    hotspotsData = hotspotsData
      .map((hotspot) => {
        if (!hotspot.osmId) {
          console.error("Skipping hotspot due to missing osm_id:", hotspot);
          return null; // Filter out bad data
        }
        return {
          ...hotspot,
          osm_id: String(hotspot.osmId), // Ensure conversion to string
          rating: hotspot.rating || null,
          num_reviews: hotspot.num_reviews || null,
        };
      })
      .filter((hotspot) => hotspot !== null);
    const dbHotspotData = await Hotspot.bulkCreate(
      hotspotsData,
      {
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
      },
      { validate: true, returning: true }
    );
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

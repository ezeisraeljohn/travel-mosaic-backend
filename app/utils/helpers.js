const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { returnResult } = require("./responses");
const dotenv = require("dotenv");
const {
  getCategoryByIdQuery,
} = require("../resources/HotspotsCategory/Queries/hotspotsCategory.query");
dotenv.config();

/**
 * @description - Generate a JWT token for authentication
 * @param {Object} data
 * @param {Boolean} isToken
 * @returns The generated token
 */
const generateToken = async (data, isToken = true) => {
  try {
    const secret = isToken
      ? process.env.TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;

    const expiry = isToken
      ? process.env.TOKEN_EXPIRY
      : process.env.REFRESH_TOKEN_EXPIRY;

    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        data,
        secret,
        { algorithm: "HS256", expiresIn: expiry },
        (err, signature) => (err ? reject(err) : resolve(signature))
      );
    });

    return returnResult(true, token);
  } catch (error) {
    throw error;
  }
};

const generateOtp = (num) => {
  if (process.env.NODE_ENV === "development") {
    return 100000;
  } else {
    return Math.floor(
      Math.random() * (9 * Math.pow(10, num - 1)) + Math.pow(10, num - 1)
    );
  }
};

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

/**
 * This function extracts the hotspots data gotten from Osm elements, so it has
 * the same fields as our hotspot database fields
 * @param {Promise} places
 * @returns The clean hotspot data gotten from Osm
 */
const extractHotspotData = async (places, query) => {
  const { categoryId, cityId } = query;
  const hotspotData = await Promise.all(
    places.map(async (place) => {
      const {
        id,
        tags,
        lat = place?.center?.lat,
        lon = place?.center?.lng,
      } = place;
      const name = tags.name || "Unknown";
      const address = tags["addr:street"] || tags["addr:full"] || "Unknown";
      const osmUrl = `https://www.openstreetmap.org/node/${id}`;
      let image = tags.image || null;
      let description = "No description available";
      if (!image && tags.wikidata) {
        image = await cleanImage(tags);
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
        category: categoryId,
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
  return hotspotData;
};

/**
 * This functions cleans the extracted hotspots from OSM, and discard hotspots
 * without name or OSM ID
 * @param {Array[Object]} hotspotData - The array
 * @return - Returns the cleaned hotspot array
 */
const cleanHotspotData = (hotspotsData) => {
  return hotspotsData
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
};

/**
 * This function Finds images for a particular OSM place, if the Osm's tag.image
 * is null, it uses the wikidata from the tags
 * @param {Object} - The tags object containing the wikidata
 */
const cleanImage = async (tags) => {
  let image;
  const wikidata = tags.wikidata;
  try {
    const wikiResponse = await axios.get(
      `${process.env.WIKI_RESPONSE_URL}=${wikidata}&languages=en`
    );
    const entities = wikiResponse.data.entities;

    // Get description
    if (entities[wikidata]?.descriptions?.en) {
      description = entities[wikidata].descriptions.en.value;
    }

    // Get image
    const claims = entities[wikidata]?.claims;
    if (claims?.P18) {
      const filename = claims.P18[0].mainsnak.datavalue.value;
      image = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
        filename
      )}`;
    }
  } catch (error) {
    console.warn(`No Wikimedia data found for ${tags.name}`);
  }
  return image;
};

module.exports = {
  generateToken,
  encryptPassword,
  verifyPassword,
  generateOtp,
  extractHotspotData,
  cleanHotspotData,
};

const { Country, City } = require("../models");
const logger = require("../utils/logger");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

const fetchWithRateLimit = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    logger.error("Error fetching data:", error.message);
    throw error;
  }
};

const createOrUpdateCountriesAndCities = async () => {
  try {
    logger.info("Starting data sync for countries and cities...");

    const now = new Date();
    const oneMonthAgo = new Date(now - ONE_MONTH);

    // Fetch all existing countries
    const existingCountries = await Country.findAll();
    const countryMap = new Map(existingCountries.map((c) => [c.code, c]));

    const countriesUrl = process.env.GEONAME_COUNTRIES_API_URL;
    const apiResponse = await fetchWithRateLimit(countriesUrl);
    const countriesData = apiResponse.geonames || [];

    let newOrUpdatedCountries = [];

    for (const country of countriesData) {
      let countryInstance = countryMap.get(country.countryCode);

      if (!countryInstance) {
        // Insert new country
        countryInstance = await Country.create({
          name: country.countryName,
          code: country.countryCode,
        });
        logger.info(`Inserted country: ${country.countryName}`);
        newOrUpdatedCountries.push(countryInstance);
      } else if (
        countryInstance.name !== country.countryName ||
        countryInstance.updatedAt < oneMonthAgo
      ) {
        // Update only if name changed or older than a month
        await countryInstance.update({ name: country.countryName });
        logger.info(`Updated country: ${country.countryName}`);
        newOrUpdatedCountries.push(countryInstance);
      }
    }

    // Fetch cities only for new or updated countries
    for (const countryInstance of newOrUpdatedCountries) {
      const cityUrl = `${process.env.GEONAME_CITIES_API_URL}?country=${countryInstance.code}&featureClass=P&maxRows=1000&username=${process.env.GEONAME_USERNAME}`;
      logger.info(`Fetching cities for ${countryInstance.name} from API...`);
      const cityResponse = await fetchWithRateLimit(cityUrl);
      const citiesData = cityResponse.geonames || [];

      for (const city of citiesData) {
        await City.upsert({
          name: city.name,
          countryId: countryInstance.id,
          state: city.adminName1,
          stateCode: city.adminCode1,
          latitude: parseFloat(city.lat),
          longitude: parseFloat(city.lng),
        });
        logger.info(`Upserted city: ${city.name}`);
      }
    }

    logger.info("Countries and cities synchronization complete.");
  } catch (error) {
    console.log(error);
  }
};

createOrUpdateCountriesAndCities();

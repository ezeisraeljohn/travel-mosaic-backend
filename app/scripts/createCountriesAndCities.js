const { Country, City } = require("../models");
const logger = require("../utils/logger");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
const MAX_RETRIES = 3; // Number of retries before failing
const TIMEOUT = 10000; // Timeout in milliseconds (10 seconds)

// Function to fetch data with retries and timeout
const fetchWithRateLimit = async (url, retries = MAX_RETRIES) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === retries) {
        logger.error(`API request failed after ${retries} attempts:`, error);
        throw error;
      }

      logger.warn(
        `Fetch failed (attempt ${attempt}/${retries}). Retrying in ${
          2 ** attempt
        }s...`
      );
      await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 1000)); // Exponential backoff
    }
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
      } else if (countryInstance.updatedAt < oneMonthAgo) {
        // Update only if older than a month
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

      // Fetch existing cities for the country
      const existingCities = await City.findAll({
        where: { country: countryInstance.id },
      });
      const cityMap = new Map(existingCities.map((c) => [c.name, c]));

      for (const city of citiesData) {
        let cityInstance = cityMap.get(city.name);

        if (!cityInstance) {
          // Insert new city
          await City.create({
            name: city.name,
            country: countryInstance.id,
            state: city.adminName1,
            stateCode: city.adminCode1,
            latitude: parseFloat(city.lat),
            longitude: parseFloat(city.lng),
          });
          logger.info(`Inserted new city: ${city.name}`);
        } else if (cityInstance.updatedAt < oneMonthAgo) {
          // Update only if older than a month
          await cityInstance.update({
            state: city.adminName1,
            stateCode: city.adminCode1,
            latitude: parseFloat(city.lat),
            longitude: parseFloat(city.lng),
          });
          logger.info(`Updated city: ${city.name}`);
        }
      }
    }

    logger.info("Countries and cities synchronization complete.");
  } catch (error) {
    logger.error("Error during sync:", error);
  }
};

createOrUpdateCountriesAndCities();

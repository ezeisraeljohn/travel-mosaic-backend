const logger = require("../../../utils/logger");
const { User } = require("../../../models");
const user = require("../../../models/user");

const getUserByEmailQuery = async (email) => {
  try {
    return User.findOne({ where: { email } });
  } catch (error) {
    logger.error("Error Finding User", {
      stack: error.stack,
    });
    throw error;
  }
};

module.exports = {
  getUserByEmailQuery,
};

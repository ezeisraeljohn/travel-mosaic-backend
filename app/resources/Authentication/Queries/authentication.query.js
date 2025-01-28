const { User } = require("../../../models");
const UserError = require("../../../utils/Errors/userError");
const logger = require("../../../utils/logger");
const bcrypt = require("bcryptjs");
const { encryptPassword } = require("../../../utils/helpers");
const uuid = require("uuid");

const createUserQuery = async (info) => {
  try {
    const { password, ...otherInfo } = info;
    let data = null;
    if (password) {
      const passwordHash = encryptPassword(password);
      data = await User.create({ ...otherInfo, password: passwordHash });
    } else {
      data = await User.create({ ...otherInfo });
    }
    const returnData = data.toJSON();
    if (returnData.password) {
      delete returnData.password;
    }
    delete returnData.deletedAt;
    return returnData;
  } catch (error) {
    logger.error(error);
    console.error(error);
    throw new UserError("Error creating user", 500);
  }
};

module.exports = {
  createUserQuery,
};

const { User } = require("../../../models");
const { stack } = require("sequelize/lib/utils");
const UserError = require("../../../utils/Errors/userError");
const logger = require("../../../utils/logger");
const bcrypt = require("bcryptjs");
const { encryptPassword } = require("../../../utils/helpers");
const { returnResult } = require("../../../utils/responses");
const uuid = require("uuid");

const createUserQuery = async (email, password = null) => {
  try {
    let data = null;
    const id = uuid.v4();
    if (password) {
      const passwordHash = encryptPassword(password);
      data = await User.create({ id, email, password: passwordHash });
    } else {
      data = await User.create({ id, email });
    }
    const returnData = data.toJSON();
    if (returnData.password) {
      delete returnData.password;
    }
    delete returnData.deletedAt;
    return returnData;
  } catch (error) {
    logger.error(error);
    throw new UserError("Error creating user", 500);
  }
};

module.exports = {
  createUserQuery,
};

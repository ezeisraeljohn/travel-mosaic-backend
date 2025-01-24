const { getUserByEmailQuery } = require("../../Users/Queries/users.query");
const logger = require("../../../utils/logger");
const UserError = require("../../../utils/Errors/userError");
const { returnFromService } = require("../../../utils/responses");
const { createUserQuery } = require("../Queries/authentication.query");

const signupService = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailQuery(email);
    if (user) {
      throw new UserError("User already exists", 400);
    }
    const newUser = await createUserQuery(email, password);
    if (!newUser) {
      throw new UserError("Error creating user", 500);
    }
    if (newUser)
      return returnFromService(201)(true)("User")("User created successfully")(
        newUser
      );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signupService,
};

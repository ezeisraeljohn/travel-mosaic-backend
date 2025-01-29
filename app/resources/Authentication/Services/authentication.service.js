const { getUserByEmailQuery } = require("../../Users/Queries/users.query");
const logger = require("../../../utils/logger");
const UserError = require("../../../utils/Errors/userError");
const { returnFromService } = require("../../../utils/responses");
const { createUserQuery } = require("../Queries/authentication.query");
const { generateToken } = require("../../../utils/helpers");

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

const loginService = async (req, res, next) => {
  try {
    const user = req.user;
    const { password, deletedAt, ...userWithoutPassword } = user.toJSON();
    if (!user) {
      throw new UserError("Invalid Credentials", 401);
    }
    const newToken = await generateToken({ id: user.id, email: user.email });
    const refreshToken = await generateToken(
      { id: user.id, email: user.email },
      false
    );
    return returnFromService(200)(true)("Authentication")(
      "User logged in sucessfuly"
    )({
      token: newToken.data,
      refreshToken: refreshToken.data,
      user: userWithoutPassword,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signupService,
  loginService,
};

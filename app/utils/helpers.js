const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

    return returnResult({ type: true, token });
  } catch (error) {
    return HandleJwtTokenErrors(error);
  }
};

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

module.exports = {
  generateToken,
  encryptPassword,
};

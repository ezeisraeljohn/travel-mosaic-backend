const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { returnResult } = require("./responses");
const dotenv = require("dotenv");
dotenv.config();

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

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  generateToken,
  encryptPassword,
  verifyPassword,
};

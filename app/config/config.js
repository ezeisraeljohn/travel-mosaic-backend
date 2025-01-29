const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const {
  DB_DEV_HOST,
  DB_DEV_USERNAME,
  DB_DEV_PASSWORD,
  DB_DEV_TYPE,
  DB_DEV_PORT,
  DB_DEV_DATABASE,
} = process.env;
module.exports = {
  development: {
    username: DB_DEV_USERNAME,
    password: DB_DEV_PASSWORD,
    database: DB_DEV_DATABASE,
    host: DB_DEV_HOST,
    dialect: DB_DEV_TYPE,
    port: DB_DEV_PORT,
    seederStorage: "json",
    seederStoragePath: "sequelizeSeedData.json",
    seederStorageTableName: "sequelize_data",
    logging: false,
  },
  test: {
    username: DB_DEV_USERNAME,
    password: DB_DEV_PASSWORD,
    database: DB_DEV_DATABASE,
    host: DB_DEV_HOST,
    dialect: DB_DEV_TYPE,
    seederStorage: "json",
    seederStoragePath: "sequelizeSeedData.json",
    seederStorageTableName: "sequelize_data",
    logging: false,
  },
  production: {
    username: DB_DEV_USERNAME,
    password: DB_DEV_PASSWORD,
    database: DB_DEV_DATABASE,
    host: DB_DEV_HOST,
    dialect: DB_DEV_TYPE,
    seederStorage: "json",
    seederStoragePath: "sequelizeSeedData.json",
    seederStorageTableName: "sequelize_data",
    logging: false,
  },
  staging: {
    username: DB_DEV_USERNAME,
    password: DB_DEV_PASSWORD,
    database: DB_DEV_DATABASE,
    host: DB_DEV_HOST,
    dialect: DB_DEV_TYPE,
    seederStorage: "json",
    seederStoragePath: "sequelizeSeedData.json",
    seederStorageTableName: "sequelize_data",
    logging: false,
  },
};

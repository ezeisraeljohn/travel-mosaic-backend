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
  DB_PROD_DATABASE,
  DB_PROD_HOST,
  DB_PROD_PASSWORD,
  DB_PROD_USERNAME,
  DB_PROD_TYPE,
  DB_PROD_PORT,
} = process.env;
module.exports = {
  development: {
    username: DB_DEV_USERNAME,
    password: DB_DEV_PASSWORD,
    database: DB_DEV_DATABASE,
    host: DB_DEV_HOST,
    dialect: "postgres",
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
    //     username: DB_PROD_USERNAME,
    //     password: DB_PROD_PASSWORD,
    //     database: DB_PROD_DATABASE,
    //     host: DB_PROD_HOST,
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
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
    dialect: "postgres",
    seederStorage: "json",
    seederStoragePath: "sequelizeSeedData.json",
    seederStorageTableName: "sequelize_data",
    logging: false,
  },
};

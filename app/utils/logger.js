const winston = require("winston");
const util = require("util");
const dotenv = require("dotenv");
dotenv.config();

// Create a new winston logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      // Safely format metadata, ensuring it's not null or undefined
      const metaString =
        meta && Object.keys(meta).length
          ? util.inspect(meta, { depth: null })
          : "";
      return `${timestamp} ${level}: ${message} ${metaString}`;
    })
  ),
  defaultMeta: {
    service: `${process.env.APP_NAME}`,
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      level: "info",
    }),
  ],
});

module.exports = logger;

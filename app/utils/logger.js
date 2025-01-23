const winston = require("winston");
const dotenv = require("dotenv");
dotenv.config();

// Create a new winston logger instance
const logger = winston.createLogger({
  level: "info", // Minimum level to log
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      // Include meta in the log output, if it exists
      return `${timestamp} ${level}: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ""
      }`;
    })
  ),
  defaultMeta: {
    service: `${process.env.APP_NAME}`,
  },
  transports: [
    // Log to the console
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

const logger = require("../utils/logger");
const BaseError = require("../utils/Errors/baseError");
const errorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    logger.error(`Error occurred: ${err.message}`, {
      stack: err.stack,
      details: err.details || null,
    });
    return res.status(err.status).json({
      success: false,
      error: err.name,
      message: err.message,
      details: err.details || null,
    });
  }

  res.status(500).json({
    success: false,
    error: "InternalServerError",
    message: "An unexpected error occurred",
  });
};

module.exports = errorHandler;

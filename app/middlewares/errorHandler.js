const logger = require("../utils/logger");
const BaseError = require("../utils/Errors/baseError");
const jwt = require("jsonwebtoken");
const { stack } = require("sequelize/lib/utils");
const { or } = require("sequelize");
const errorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    logger.error(`BaseError: ${err}`, {
      stack: err.stack,
      origin: err.origin,
      field: err.field,
    });
    return res.status(err.status).json({
      success: false,
      error: err.name,
      message: err.message,
      details: err.details || null,
    });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    logger.error(
      `JWT >>> JsonWebTokenError: Permission denied, Unauthorized access`,
      {
        stack: err.stack,
      }
    );
    return res.status(err.status).json({
      success: false,
      error: "Authorization Failed",
      message: "Permission denied, Unauthorized access",
      details: err?.details || null,
    });
  }

  if (err instanceof jwt.TokenExpiredError) {
    logger.error(`JWT >>> TokenExpiredError: Token Expired`, {
      stack: err.stack,
    });
    return res.status(err.status).json({
      success: false,
      error: "Authentication Failed",
      message: "Token Expired",
      details: err?.details || null,
    });
  }

  res.status(500).json({
    success: false,
    error: "InternalServerError",
    message: "An unexpected error occurred",
  });
};

module.exports = errorHandler;

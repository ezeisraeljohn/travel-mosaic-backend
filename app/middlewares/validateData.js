const ValidationError = require("../utils/Errors/validationErrors");
const logger = require("../utils/logger");

const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (error) {
    logger.error(`Error Validating data ${error}`);
    const errors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    next(new ValidationError(errors));
  }
};

const validateQuery = (schema) => async (req, res, next) => {
  try {
    req.query = await schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (error) {
    logger.error(`Error Validating data`);
    const errors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    next(new ValidationError(errors));
  }
};

module.exports = { validate, validateQuery };

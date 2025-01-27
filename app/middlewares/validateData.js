const ValidationError = require("../utils/Errors/validationErrors");
const logger = require("../utils/logger");

const validate = (schema) => async (req, res, next) => {
  try {
    console.log("Validated data recieved the request");
    req.body = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    console.log("Exiting the validated data");
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

module.exports = { validate };

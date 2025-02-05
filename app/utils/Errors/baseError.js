class BaseError extends Error {
  constructor(name, message, status = 500, details = null) {
    super(message);
    this.name = name || "BaseError";
    this.status = Number.isInteger(status) ? status : 500;
    this.details = details;
  }
}

module.exports = BaseError;

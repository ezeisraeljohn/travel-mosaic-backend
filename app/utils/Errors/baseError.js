class BaseError extends Error {
  constructor(name, message, status, details = null) {
    super(message);
    this.name = name;
    this.status = status;
    this.details = details;
  }
}

module.exports = BaseError;

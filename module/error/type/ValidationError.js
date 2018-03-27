// error/response/ValidationError.js

const BaseError = require('./BaseError');


class ValidationError extends BaseError {

  constructor(message) {
    super(BaseError.VALIDATION_STATUS, message);
  }
}

module.exports = ValidationError;

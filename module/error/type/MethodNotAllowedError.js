const BaseError = require('./BaseError');


class MethodNotAllowedError extends BaseError {

  constructor(message) {
    super(BaseError.METHOD_NOT_ALLOWED_STATUS, message);
  }
}

module.exports = MethodNotAllowedError;

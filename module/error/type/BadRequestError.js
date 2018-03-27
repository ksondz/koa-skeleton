const BaseError = require('./BaseError');


class BadRequestError extends BaseError {

  constructor(message) {
    super(BaseError.BAD_REQUEST_STATUS, message);
  }
}

module.exports = BadRequestError;

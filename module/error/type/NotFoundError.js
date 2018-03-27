const BaseError = require('./BaseError');


class NotFoundError extends BaseError {

  constructor(message) {
    super(BaseError.NOT_FOUND_STATUS, message);
  }
}

module.exports = NotFoundError;

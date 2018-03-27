const BaseError = require('./BaseError');


class NotAuthorizedError extends BaseError {

  constructor(message) {
    super(BaseError.UNAUTHORIZED_STATUS, message);
  }
}

module.exports = NotAuthorizedError;

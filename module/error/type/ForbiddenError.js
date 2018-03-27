const BaseError = require('./BaseError');


class ForbiddenError extends BaseError {

  constructor(message) {
    super(BaseError.FORBIDDEN_STATUS, message);
  }
}

module.exports = ForbiddenError;

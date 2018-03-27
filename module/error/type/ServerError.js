const BaseError = require('./BaseError');


class ServerError extends BaseError {

  constructor(message) {
    super(BaseError.SERVER_STATUS, message);
  }
}

module.exports = ServerError;

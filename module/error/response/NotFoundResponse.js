

const BaseResponse = require('./BaseResponse');

class NotFoundResponse extends BaseResponse {

  /**
   * @param message
   */
  constructor(message) {
    super(BaseResponse.NOT_FOUND_STATUS, message);
  }
}

module.exports = NotFoundResponse;

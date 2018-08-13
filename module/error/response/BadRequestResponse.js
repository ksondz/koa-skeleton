

const BaseResponse = require('./BaseResponse');

class BadRequestResponse extends BaseResponse {


  /**
   * @param message
   */
  constructor(message) {
    super(BaseResponse.BAD_REQUEST_STATUS, message);
  }
}

module.exports = BadRequestResponse;

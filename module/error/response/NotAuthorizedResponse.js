

const BaseResponse = require('./BaseResponse');

class NotAuthorizedResponse extends BaseResponse {


  /**
   * @param message
   */
  constructor(message) {
    super(BaseResponse.UNAUTHORIZED_STATUS, message);
  }
}

module.exports = NotAuthorizedResponse;



const BaseResponse = require('./BaseResponse');

class ForbiddenResponse extends BaseResponse {

  /**
   * @param message
   */
  constructor(message) {
    super(BaseResponse.FORBIDDEN_STATUS, message);
  }
}

module.exports = ForbiddenResponse;

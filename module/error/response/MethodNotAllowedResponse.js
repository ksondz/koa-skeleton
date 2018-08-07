

const BaseResponse = require('./BaseResponse');

class MethodNotAllowedResponse extends BaseResponse {


  /**
   * @param message
   */
  constructor(message) {
    super(BaseResponse.METHOD_NOT_ALLOWED_STATUS, message);
  }
}

module.exports = MethodNotAllowedResponse;

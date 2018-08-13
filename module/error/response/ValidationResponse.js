

const BaseResponse = require('./BaseResponse');

class ValidationResponse extends BaseResponse {


  /**
   * @param message
   */
  constructor(message) {
    super(BaseResponse.VALIDATION_STATUS, message);
  }
}

module.exports = ValidationResponse;

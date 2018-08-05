

const BaseResponse = require('./BaseResponse');


class MethodNotAllowedResponse extends BaseResponse {

  constructor(message) {
    super(BaseResponse.METHOD_NOT_ALLOWED_STATUS, message);
  }
}

module.exports = MethodNotAllowedResponse;

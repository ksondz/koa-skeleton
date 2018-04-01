// error/response/ForbiddenResponse.js

const BaseResponse = require('./BaseResponse');


class ForbiddenResponse extends BaseResponse {

  constructor(message) {
    super(BaseResponse.FORBIDDEN_STATUS, message);
  }
}

module.exports = ForbiddenResponse;

// error/response/BadRequestResponse.js

const BaseResponse = require('./BaseResponse');


class BadRequestResponse extends BaseResponse {

  constructor(message) {
    super(BaseResponse.BAD_REQUEST_STATUS, message);
  }
}

module.exports = BadRequestResponse;

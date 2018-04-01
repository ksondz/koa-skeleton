// error/response/NotFoundResponse.js

const BaseResponse = require('./BaseResponse');


class NotFoundResponse extends BaseResponse {

  constructor(message) {
    super(BaseResponse.NOT_FOUND_STATUS, message);
  }
}

module.exports = NotFoundResponse;

// error/response/ServerResponse.js

const BaseResponse = require('./BaseResponse');


class ServerResponse extends BaseResponse {

  constructor(message) {
    super(BaseResponse.SERVER_STATUS, message);
  }
}

module.exports = ServerResponse;

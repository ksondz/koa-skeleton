

const BaseResponse = require('./BaseResponse');


class NotAuthorizedResponse extends BaseResponse {

  constructor(message) {
    super(BaseResponse.UNAUTHORIZED_STATUS, message);
  }
}

module.exports = NotAuthorizedResponse;

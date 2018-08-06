

const BaseResponse = require('./BaseResponse');

class ServerResponse extends BaseResponse {

  /**
   * @param message
   */
  constructor(message) {
    super(BaseResponse.SERVER_STATUS, message);
  }
}

module.exports = ServerResponse;

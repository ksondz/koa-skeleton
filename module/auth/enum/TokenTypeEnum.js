

const BaseEnum = require('../../core/enum/BaseEnum');


class TokenTypeEnum extends BaseEnum {

  static get ACCESS_TOKEN_TYPE() {
    return 'accessToken';
  }

  static get REFRESH_TOKEN_TYPE() {
    return 'refreshToken';
  }

  static get REGISTER_TOKEN_TYPE() {
    return 'registerToken';
  }

  static get FORGOT_TOKEN_TYPE() {
    return 'forgotToken';
  }

  static getValues() {
    return [
      this.ACCESS_TOKEN_TYPE,
      this.REFRESH_TOKEN_TYPE,
      this.REGISTER_TOKEN_TYPE,
      this.FORGOT_TOKEN_TYPE,
    ];
  }
}

module.exports = TokenTypeEnum;

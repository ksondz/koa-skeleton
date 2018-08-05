

const BaseEnum = require('../../core/enum/BaseEnum');


class TokenTypeEnum extends BaseEnum {

  static get ACCESS_TOKEN_TYPE() {
    return 'access_token';
  }

  static get REFRESH_TOKEN_TYPE() {
    return 'refresh_token';
  }

  static get REGISTER_TOKEN_TYPE() {
    return 'register_token';
  }

  static get FORGOT_TOKEN_TYPE() {
    return 'forgot_token';
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

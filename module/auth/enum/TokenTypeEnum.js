// auth/enum/BaseEnum.js

const BaseEnum = require('../../appExtension/enum/BaseEnum');


class TokenTypeEnum extends BaseEnum {

  static get ACCESS_TOKEN_TYPE() {
    return 'access';
  }

  static get REGISTER_TOKEN_TYPE() {
    return 'register';
  }

  static get FORGOT_TOKEN_TYPE() {
    return 'forgot';
  }

  static getValues() {
    return [
      this.ACCESS_TOKEN_TYPE,
      this.REGISTER_TOKEN_TYPE,
      this.FORGOT_TOKEN_TYPE,
    ];
  }
}

module.exports = TokenTypeEnum;

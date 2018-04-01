// auth/enum/TokenTypeEnum.js

const BaseEnum = require('../../skeletonExtension/enum/BaseEnum');


class TokenTypeEnum extends BaseEnum {

  static get ACCESS_TYPE() {
    return 'access';
  }

  static get REFRESH_TYPE() {
    return 'refresh';
  }

  static get REGISTER_TYPE() {
    return 'register';
  }

  static get FORGOT_TYPE() {
    return 'forgot';
  }

  static getValues() {
    return [
      this.ACCESS_TYPE,
      this.REFRESH_TYPE,
      this.REGISTER_TYPE,
      this.FORGOT_TYPE,
    ];
  }
}

module.exports = TokenTypeEnum;

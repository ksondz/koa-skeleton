// user/enum/BaseEnum.js

const BaseEnum = require('../../core/enum/BaseEnum');


class UserRoleEnum extends BaseEnum {

  static get GUEST_ROLE() {
    return 'guest';
  }

  static get USER_ROLE() {
    return 'user';
  }

  static get ADMIN_ROLE() {
    return 'admin';
  }

  static getValues() {
    return [
      this.USER_ROLE,
      this.ADMIN_ROLE,
    ];
  }
}

module.exports = UserRoleEnum;

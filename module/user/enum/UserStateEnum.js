

const BaseEnum = require('../../core/enum/BaseEnum');


class UserStateEnum extends BaseEnum {

  static get ACTIVE_USER_STATE() {
    return 'active';
  }

  static get BLOCKED_USER_STATE() {
    return 'blocked';
  }

  static get DELETED_USER_STATE() {
    return 'deleted';
  }

  static getValues() {
    return [
      this.ACTIVE_USER_STATE,
      this.BLOCKED_USER_STATE,
      this.DELETED_USER_STATE,
    ];
  }
}

module.exports = UserStateEnum;

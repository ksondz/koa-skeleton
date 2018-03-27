// user/enum/BaseEnum.js

const BaseEnum = require('../../appExtension/enum/BaseEnum');


class UserRoleEnum extends BaseEnum {

  static get GUEST_USER_ROLE() {
    return 'guest';
  }

  static get ADMIN_USER_ROLE() {
    return 'admin';
  }

  static get TEACHER_USER_ROLE() {
    return 'teacher';
  }

  static get STUDENT_USER_ROLE() {
    return 'student';
  }

  static getValues() {
    return [
      this.ADMIN_USER_ROLE,
      this.TEACHER_USER_ROLE,
      this.STUDENT_USER_ROLE,
    ];
  }
}

module.exports = UserRoleEnum;

// auth/Validator/PasswordValidator.js

const BaseValidator = require('../../appExtension/validator/BaseValidator');


class PasswordValidator extends BaseValidator {

  /**
   * @return {*}
   */
  getSchema() {

    const joiBuilder = this.getJoiBuilder();

    return joiBuilder.object().keys({
      password: joiBuilder.string().min(4).max(15).required(),
    });
  }


  /**
   * @param data
   * @return {Promise<void>}
   */
  async validate(data) {

    const validateData = await super.validate(data);

    return validateData;
  }
}

module.exports = PasswordValidator;

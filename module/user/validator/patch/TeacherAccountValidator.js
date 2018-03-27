// user/validator/patch/TeacherAccountValidator.js

const AccountValidator = require('./AccountValidator');


class TeacherAccountValidator extends AccountValidator {

  getSchema() {
    const joiBuilder = this.getJoiBuilder();

    return joiBuilder.object().keys({
      // TODO custom message
      email: joiBuilder.string().email().options(
        { language: { string: { email: 'Please provide a valid email' } } },
      ).label(' '),

      firstName: joiBuilder.string().max(64).required(),
      lastName: joiBuilder.string().max(64).required(),
      description: joiBuilder.string().max(250).empty('').default(''),
      oldPassword: joiBuilder.string().min(4).max(15),
      password: joiBuilder.string().min(4).max(15),
      passwordConfirm: joiBuilder.any().valid(joiBuilder.ref('password')).options(
        { language: { any: { allowOnly: 'must match password' } } },
      ),
    });
  }

  /**
   * @param data
   * @param user
   * @return {Promise<void>}
   */
  async validate(data, user) {

    const validatedData = await super.validate(data, user);

    if (validatedData.email) {
      const teacher = await this.getUserRepository().findTeacherByEmail(validatedData.email);

      if (teacher && teacher.id !== user.id) {
        throw this.getErrorService().createValidationError({ email: 'Email is already taken' });
      }
    }

    return validatedData;
  }
}

module.exports = TeacherAccountValidator;

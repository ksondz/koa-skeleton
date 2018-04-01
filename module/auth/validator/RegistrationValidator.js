// auth/Validator/RegistrationValidator.js

const BaseValidator = require('../../skeletonExtension/validator/BaseValidator');


class RegistrationValidator extends BaseValidator {


  static get USER_EXISTS_TEMPLATE() {
    return 'Current email address is already registered';
  }


  /**
   * @param errorService
   * @param modelService
   * @param cryptoService
   */
  constructor(errorService, modelService, cryptoService) {
    super(errorService);
    this.modelService = modelService;
    this.cryptoService = cryptoService;
  }


  /**
   * @return {*}
   */
  getSchema() {
    const joiBuilder = this.getJoiBuilder();

    return joiBuilder.object().keys({
      firstName: joiBuilder.string().max(64).required(),
      lastName: joiBuilder.string().max(64).required(),
      email: joiBuilder.string().email().required().error(() => {
        return 'Invalid Email';
      }),
      password: joiBuilder.string().min(4).max(15).required().error(() => {
        return 'Password must be at least 4 characters long';
      }),
    });
  }

  /**
   * @param data
   * @return {Promise<void>}
   */
  async validate(data) {

    const validateData = await super.validate(data);

    const user = await this.getUserRepository().findTeacherByEmail(validateData.email);

    if (user) {
      throw this.getErrorService().createValidationError({ email: RegistrationValidator.USER_EXISTS_TEMPLATE });
    }

    if (validateData.password) {
      validateData.password = await this.getCryptoService().createBcryptHash(validateData.password.trim());
      validateData.passwordUpdatedAt = new Date(Date.now() - 7200000);
    }

    return validateData;
  }

  /**
   * @return {Request<CodeCommit.GetRepositoryOutput, AWSError>}
   */
  getUserRepository() {
    return this.getModelService().get('User').getRepository();
  }

  /**
   * @return {*}
   */
  getModelService() {
    return this.modelService;
  }

  /**
   * @return {*}
   */
  getCryptoService() {
    return this.cryptoService;
  }
}

module.exports = RegistrationValidator;

// user/validator/patch/AccountValidator.js

const BaseValidator = require('../../../appExtension/validator/BaseValidator');


class AccountValidator extends BaseValidator {

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
   * @param data
   * @param user
   * @return {Promise<void>}
   */
  async validate(data, user) {

    const validatedData = await super.validate(data);

    if (validatedData.password && validatedData.oldPassword && validatedData.passwordConfirm) {

      if (validatedData.password.trim() !== validatedData.passwordConfirm.trim()) {
        throw this.getErrorService().createValidationError({ passwordConfirm: 'Password and password confirm not equal' });
      }

      if (!await this.getCryptoService().verifyHash(validatedData.oldPassword, user.password)) {
        throw this.getErrorService().createValidationError({ oldPassword: 'Wrong current password' });
      }

      validatedData.password = await this.getCryptoService().createBcryptHash(validatedData.password.trim());
      delete validatedData.oldPassword;
      delete validatedData.passwordConfirm;
      validatedData.passwordUpdatedAt = new Date(Date.now());
    }

    return validatedData;
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

module.exports = AccountValidator;

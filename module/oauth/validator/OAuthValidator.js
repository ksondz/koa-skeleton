

const BaseValidator = require('./../../core/validator/BaseValidator');

const UserStateEnum = require('./../../user/enum/UserStateEnum');


class OAuthValidator extends BaseValidator {


  static get INVALID_LOGIN_KEY() {
    return 'InvalidLogin';
  }

  static get INVALID_LOGIN_TEMPLATE() {
    return 'Invalid login and password combination';
  }

  static get USER_IS_NOT_FOUND() {
    return 'User with current username is not found';
  }

  static get USER_IS_BLOCKED() {
    return 'User with current username is blocked';
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
      username: joiBuilder.string().required(),
      password: joiBuilder.string().min(4).max(15).required(),
    });
  }

  /**
   * @param data
   * @return {Promise<void>}
   */
  async validate(data) {

    const validateData = await super.validate(data);

    const user = await this.getUserRepository().findByEmail(validateData.username);

    if (!user) {
      throw this.getErrorService().createValidationError(OAuthValidator.USER_IS_NOT_FOUND);
    }

    const passwordIsVerified = await await this.getCryptoService().verifyHash(validateData.password, user.password);

    if (!passwordIsVerified) {
      throw this.getErrorService().createValidationError({
        [OAuthValidator.INVALID_LOGIN_KEY]: OAuthValidator.INVALID_LOGIN_TEMPLATE,
      });
    }

    if (user.state === UserStateEnum.BLOCKED_USER_STATE) {
      throw this.getErrorService().createValidationError(OAuthValidator.USER_IS_BLOCKED);
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

module.exports = OAuthValidator;

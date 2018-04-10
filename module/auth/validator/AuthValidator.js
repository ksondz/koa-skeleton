// auth/Validator/AuthValidator.js

const BaseValidator = require('./../../core/validator/BaseValidator');

const UserStateEnum = require('./../../user/enum/UserStateEnum');
const TokenTypeEnum = require('./../enum/TokenTypeEnum');


class AuthValidator extends BaseValidator {


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
   * @param authService
   */
  constructor(errorService, modelService, cryptoService, authService) {
    super(errorService);

    this.modelService = modelService;
    this.cryptoService = cryptoService;
    this.authService = authService;
  }

  /**
   * @return {*}
   */
  getSchema() {

    const joiBuilder = this.getJoiBuilder();

    return joiBuilder.object().keys({
      username: joiBuilder.alternatives().when('type', {
        is: TokenTypeEnum.REFRESH_TOKEN_TYPE, then: joiBuilder.string(), otherwise: joiBuilder.string().required(),
      }).required(),
      password: joiBuilder.alternatives().when('type', {
        is: TokenTypeEnum.REFRESH_TOKEN_TYPE, then: joiBuilder.string(), otherwise: joiBuilder.string().min(4).max(15).required(),
      }).required(),
      refreshToken: joiBuilder.alternatives().when('type', {
        is: TokenTypeEnum.REFRESH_TOKEN_TYPE, then: joiBuilder.string().required(), otherwise: joiBuilder.string(),
      }).required(),
      type: joiBuilder.string(),
    });
  }

  /**
   * @param data
   * @return {Promise<void>}
   */
  async validate(data) {

    const validateData = await super.validate(data);

    if (validateData.type === TokenTypeEnum.REFRESH_TOKEN_TYPE) {

      await this.getAuthService().validateRefreshToken(validateData.refreshToken);

    } else {

      await this.validateUserNameAndPassword(validateData.username, validateData.password);
    }

    return validateData;
  }


  /**
   * @param username
   * @param password
   * @return {Promise<void>}
   */
  async validateUserNameAndPassword(username, password) {

    const user = await this.getUserRepository().findByEmail(username);

    if (!user) {
      throw this.getErrorService().createValidationError(AuthValidator.USER_IS_NOT_FOUND);
    }

    const passwordIsVerified = await await this.getCryptoService().verifyHash(password, user.password);

    if (!passwordIsVerified) {

      const errorMessages = { [AuthValidator.INVALID_LOGIN_KEY]: AuthValidator.INVALID_LOGIN_TEMPLATE };

      throw this.getErrorService().createValidationError(errorMessages);
    }

    if (user.state === UserStateEnum.BLOCKED_USER_STATE) {
      throw this.getErrorService().createValidationError(AuthValidator.USER_IS_BLOCKED);
    }
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

  /**
   * @return {*}
   */
  getAuthService() {
    return this.authService;
  }
}

module.exports = AuthValidator;

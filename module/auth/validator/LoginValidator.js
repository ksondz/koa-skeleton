// auth/Validator/LoginValidator.js

const BaseValidator = require('../../skeletonExtension/validator/BaseValidator');

const UserRoleEnum = require('./../../user/enum/UserRoleEnum');
const UserStateEnum = require('./../../user/enum/UserStateEnum');


class LoginValidator extends BaseValidator {


  static get INVALID_LOGIN_KEY() {
    return 'InvalidLogin';
  }

  static get INVALID_LOGIN_TEMPLATE() {
    return 'Invalid login and password combination';
  }

  static get ACCOUNT_NOT_ACTIVATED() {
    return 'Account not activated';
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

    const loginCondition = {
      is: UserRoleEnum.TEACHER_USER_ROLE,
      then: joiBuilder.string().email().required(),
      otherwise: joiBuilder.string().min(2).max(64).required(),
    };

    return joiBuilder.object().keys({
      login: joiBuilder.alternatives().when('userType', loginCondition).required(),
      password: joiBuilder.string().min(4).max(15).required(),
      userType: joiBuilder.string().only([UserRoleEnum.TEACHER_USER_ROLE, UserRoleEnum.STUDENT_USER_ROLE]).required(),
    });
  }

  /**
   * @param data
   * @return {Promise<void>}
   */
  async validate(data) {

    const validateData = await super.validate(data);

    const user = await this.findTeacherOrStudent(validateData.userType, validateData.login);

    if (!user || !await this.passwordIsVeryfied(validateData.password, user.password)) {

      const errorMessages = {};
      errorMessages[LoginValidator.INVALID_LOGIN_KEY] = LoginValidator.INVALID_LOGIN_TEMPLATE;

      throw this.getErrorService().createValidationError(errorMessages);
    }

    if (user.state === UserStateEnum.BLOCKED_USER_STATE) {
      throw this.getErrorService().createValidationError(LoginValidator.ACCOUNT_NOT_ACTIVATED);
    }

    return validateData;
  }

  /**
   * @param userType
   * @param login
   * @return {Promise<*>}
   */
  async findTeacherOrStudent(userType, login) {

    let user;

    if (userType === UserRoleEnum.TEACHER_USER_ROLE) {
      user = await this.getUserRepository().findTeacherByEmail(login);
    } else {
      user = await this.getUserRepository().findStudentByUserName(login);
    }

    return user;
  }

  /**
   * @param password
   * @param userPassword
   * @return {Promise<*|boolean>}
   */
  async passwordIsVeryfied(password, userPassword) {
    const isVerified = await this.getCryptoService().verifyHash(password, userPassword);
    return isVerified || false;
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

module.exports = LoginValidator;

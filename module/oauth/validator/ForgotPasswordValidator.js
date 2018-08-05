

const BaseValidator = require('../../core/validator/BaseValidator');


class ForgotPasswordValidator extends BaseValidator {


  static get EMAIL_IS_NOT_FOUND_TEMPLATE() {
    return 'Email is not found';
  }


  /**
   * @param errorService
   * @param modelService
   */
  constructor(errorService, modelService) {
    super(errorService);
    this.modelService = modelService;
  }


  /**
   * @return {*}
   */
  getSchema() {
    const joiBuilder = this.getJoiBuilder();

    return joiBuilder.object().keys({
      email: joiBuilder.string().email().required(),
    });
  }

  /**
   * @param data
   * @return {Promise<void>}
   */
  async validate(data) {

    const validateData = await super.validate(data);

    const user = await this.getUserRepository().findTeacherByEmail(validateData.email);

    if (!user) {
      throw this.getErrorService().createValidationError({ email: ForgotValidator.EMAIL_IS_NOT_FOUND_TEMPLATE });
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
}

module.exports = ForgotPasswordValidator;

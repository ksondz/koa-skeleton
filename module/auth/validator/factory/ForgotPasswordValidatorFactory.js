// auth/validator/factory/ForgotPasswordValidatorFactory.js

const FactoryInterface = require('./../../../core/factory/FactoryInterface');

const ForgotPasswordValidator = require('./../ForgotPasswordValidator');


class ForgotPasswordValidatorFactory extends FactoryInterface {


  /**
   * @param app
   * @return {ForgotPasswordValidator}
   */
  constructor(app) {

    super(app);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');

    return new ForgotPasswordValidator(errorService, modelService);
  }
}

module.exports = ForgotPasswordValidatorFactory;

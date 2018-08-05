

const FactoryInterface = require('./../../../core/factory/FactoryInterface');

const ForgotPasswordValidator = require('./../ForgotPasswordValidator');


class ForgotPasswordValidatorFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {ForgotPasswordValidator}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');

    return new ForgotPasswordValidator(errorService, modelService);
  }
}

module.exports = ForgotPasswordValidatorFactory;

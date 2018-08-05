

const FactoryInterface = require('../../../core/factory/FactoryInterface');

const ForgotValidator = require('./../ForgotValidator');


class ForgotValidatorFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {ForgotValidator}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');

    return new ForgotValidator(errorService, modelService);
  }
}

module.exports = ForgotValidatorFactory;

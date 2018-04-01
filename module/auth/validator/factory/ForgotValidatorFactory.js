// auth/validator/factory/ForgotValidatorFactory.js

const FactoryInterface = require('../../../skeletonExtension/factory/FactoryInterface');

const ForgotValidator = require('./../ForgotValidator');


class ForgotValidatorFactory extends FactoryInterface {


  /**
   * @param app
   * @return {ForgotValidator}
   */
  constructor(app) {

    super(app);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');

    return new ForgotValidator(errorService, modelService);
  }
}

module.exports = ForgotValidatorFactory;

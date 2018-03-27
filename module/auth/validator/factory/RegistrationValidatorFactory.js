// auth/validator/factory/ForgotValidatorFactory.js

const FactoryInterface = require('../../../appExtension/factory/FactoryInterface');

const RegistrationValidator = require('./../RegistrationValidator');


class RegistrationValidatorFactory extends FactoryInterface {


  /**
   * @param app
   * @return {RegistrationValidator}
   */
  constructor(app) {

    super(app);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');
    const cryptoService = this.getServiceManager().get('CryptoService');

    return new RegistrationValidator(errorService, modelService, cryptoService);
  }
}

module.exports = RegistrationValidatorFactory;

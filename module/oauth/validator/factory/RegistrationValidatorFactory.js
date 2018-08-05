

const FactoryInterface = require('../../../core/factory/FactoryInterface');

const RegistrationValidator = require('./../RegistrationValidator');


class RegistrationValidatorFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {RegistrationValidator}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');
    const cryptoService = this.getServiceManager().get('CryptoService');

    return new RegistrationValidator(errorService, modelService, cryptoService);
  }
}

module.exports = RegistrationValidatorFactory;

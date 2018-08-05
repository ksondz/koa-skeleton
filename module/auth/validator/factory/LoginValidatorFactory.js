

const FactoryInterface = require('../../../core/factory/FactoryInterface');

const LoginValidator = require('./../LoginValidator');


class LoginValidatorFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {LoginValidator}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');
    const cryptoService = this.getServiceManager().get('CryptoService');

    return new LoginValidator(errorService, modelService, cryptoService);
  }
}

module.exports = LoginValidatorFactory;

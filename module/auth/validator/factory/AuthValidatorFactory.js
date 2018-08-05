

const FactoryInterface = require('../../../core/factory/FactoryInterface');

const AuthValidator = require('./../AuthValidator');


class AuthValidatorFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {AuthValidator}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');
    const cryptoService = this.getServiceManager().get('CryptoService');

    return new AuthValidator(errorService, modelService, cryptoService);
  }
}

module.exports = AuthValidatorFactory;

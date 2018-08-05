

const FactoryInterface = require('../../../core/factory/FactoryInterface');

const OAuthValidator = require('./../OAuthValidator');


class OAuthValidatorFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {OAuthValidator}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');
    const cryptoService = this.getServiceManager().get('CryptoService');

    return new OAuthValidator(errorService, modelService, cryptoService);
  }
}

module.exports = OAuthValidatorFactory;

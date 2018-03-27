// auth/validator/factory/OAuthValidatorFactory.js

const FactoryInterface = require('../../../appExtension/factory/FactoryInterface');

const OAuthValidator = require('./../OAuthValidator');


class OAuthValidatorFactory extends FactoryInterface {


  /**
   * @param app
   * @return {OAuthValidator}
   */
  constructor(app) {

    super(app);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');
    const cryptoService = this.getServiceManager().get('CryptoService');

    return new OAuthValidator(errorService, modelService, cryptoService);
  }
}

module.exports = OAuthValidatorFactory;

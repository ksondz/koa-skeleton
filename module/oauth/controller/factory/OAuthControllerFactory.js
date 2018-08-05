

const FactoryInterface = require('./../../../core/factory/FactoryInterface');

const OAuthController = require('../OAuthController');


class OAuthControllerFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {OAuthController}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const validatorManager = serviceManager.get('ValidatorManager');

    const modelService = serviceManager.get('ModelService');
    const errorService = serviceManager.get('ErrorService');

    const oauthService = serviceManager.get('OAuthService');
    const cryptoService = serviceManager.get('CryptoService');
    const mailService = serviceManager.get('MailService');

    return new OAuthController(validatorManager, modelService, errorService, oauthService, cryptoService, mailService);
  }
}

module.exports = OAuthControllerFactory;

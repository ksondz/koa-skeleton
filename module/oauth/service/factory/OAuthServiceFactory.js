

const FactoryInterface = require('../../../core/factory/FactoryInterface');

const moment = require('moment');
const OAuthService = require('./../OAuthService');


class OAuthServiceFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {OAuthService}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');
    const cryptoService = this.getServiceManager().get('CryptoService');

    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: process.env.JWT_EXP,
    };

    return new OAuthService(errorService, modelService, cryptoService, secret, options, moment);
  }
}

module.exports = OAuthServiceFactory;



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

    return new OAuthService(
      serviceManager.get('ErrorService'),
      serviceManager.get('ModelService'),
      serviceManager.get('CryptoService'),
      this.getJWTConfig().secret,
      this.getJWTConfig().options,
      moment,
    );
  }


  /**
   * @return {{secret: string, options: {expiresIn: string}}}
   */
  getJWTConfig() {
    return this.getConfig().jwt;
  }
}

module.exports = OAuthServiceFactory;

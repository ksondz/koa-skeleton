

const FactoryInterface = require('../../../core/factory/FactoryInterface');

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

    return new OAuthService(errorService, modelService, this.getConfig().jwt);
  }
}

module.exports = OAuthServiceFactory;

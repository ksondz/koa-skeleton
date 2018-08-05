

const FactoryInterface = require('../../../core/factory/FactoryInterface');

const AuthService = require('./../AuthService');


class AuthServiceFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {AuthService}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');

    return new AuthService(errorService, modelService, this.getConfig().jwt);
  }
}

module.exports = AuthServiceFactory;

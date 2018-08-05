

const FactoryInterface = require('../../../core/factory/FactoryInterface');

const AccountController = require('./../AccountController');


class AccountControllerFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {AccountController}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const modelService = this.getServiceManager().get('ModelService');
    const validatorManager = this.getServiceManager().get('ValidatorManager');
    const errorService = this.getServiceManager().get('ErrorService');
    const oauthService = this.getServiceManager().get('OAuthService');

    return new AccountController(modelService, validatorManager, errorService, oauthService);
  }
}

module.exports = AccountControllerFactory;

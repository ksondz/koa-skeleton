

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
    const validatorService = this.getServiceManager().get('ValidatorService');
    const errorService = this.getServiceManager().get('errorService');
    const authService = this.getServiceManager().get('AuthService');

    return new AccountController(modelService, validatorService, errorService, authService);
  }
}

module.exports = AccountControllerFactory;

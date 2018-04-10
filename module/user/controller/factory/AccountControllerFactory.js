// user/controller/factory/AccountControllerFactory.js


const FactoryInterface = require('../../../core/factory/FactoryInterface');

const AccountController = require('./../AccountController');


class AccountControllerFactory extends FactoryInterface {


  /**
   * @param app
   * @return {AccountController}
   */
  constructor(app) {

    super(app);

    const modelService = this.getServiceManager().get('ModelService');
    const validatorService = this.getServiceManager().get('ValidatorService');
    const authService = this.getServiceManager().get('AuthService');

    return new AccountController(modelService, validatorService, authService);
  }
}

module.exports = AccountControllerFactory;

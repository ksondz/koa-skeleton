// user/controller/factory/AccountControllerFactory.js


const FactoryInterface = require('./../../../appExtension/factory/FactoryInterface');

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
    const oauthService = this.getServiceManager().get('OAuthService');

    return new AccountController(modelService, validatorService, oauthService);
  }
}

module.exports = AccountControllerFactory;

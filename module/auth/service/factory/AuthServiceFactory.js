// auth/service/factory/AuthServiceFactory.js


const FactoryInterface = require('../../../core/factory/FactoryInterface');

const AuthService = require('./../AuthService');


class AuthServiceFactory extends FactoryInterface {


  /**
   * @param app
   * @return {AuthService}
   */
  constructor(app) {

    super(app);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');

    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: process.env.JWT_EXP,
    };

    return new AuthService(errorService, modelService, secret, options);
  }
}

module.exports = AuthServiceFactory;

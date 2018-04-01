// auth/service/factory/OAuthServiceFactory.js


const FactoryInterface = require('../../../skeletonExtension/factory/FactoryInterface');

const OAuthService = require('./../OAuthService');


class OAuthServiceFactory extends FactoryInterface {


  /**
   * @param app
   * @return {OAuthService}
   */
  constructor(app) {

    super(app);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');

    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: process.env.JWT_EXP,
    };

    return new OAuthService(errorService, modelService, secret, options);
  }
}

module.exports = OAuthServiceFactory;

// auth/controller/factory/RestControllerFactory.js


const FactoryInterface = require('./../../../appExtension/factory/FactoryInterface');

const AuthController = require('./../AuthController');
const moment = require('moment');


class AuthControllerFactory extends FactoryInterface {


  /**
   * @param app
   * @return {AuthController}
   */
  constructor(app) {

    super(app);

    const modelService = this.getServiceManager().get('ModelService');
    const validatorService = this.getServiceManager().get('ValidatorService');
    const cryptoService = this.getServiceManager().get('CryptoService');
    const mailService = this.getServiceManager().get('MailService');
    const oauthService = this.getServiceManager().get('OAuthService');

    return new AuthController(modelService, validatorService, cryptoService, mailService, oauthService, moment);
  }
}

module.exports = AuthControllerFactory;

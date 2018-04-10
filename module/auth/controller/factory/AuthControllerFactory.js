// auth/controller/factory/RestControllerFactory.js


const FactoryInterface = require('./../../../core/factory/FactoryInterface');

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
    const authService = this.getServiceManager().get('AuthService');

    return new AuthController(modelService, validatorService, cryptoService, mailService, authService, moment);
  }
}

module.exports = AuthControllerFactory;

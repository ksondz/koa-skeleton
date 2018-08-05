

const FactoryInterface = require('./../../../core/factory/FactoryInterface');

const AuthController = require('./../AuthController');
const moment = require('moment');


class AuthControllerFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {AuthController}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const modelService = serviceManager.get('ModelService');
    const errorService = serviceManager.get('ErrorService');
    const validatorService = serviceManager.get('ValidatorService');
    const cryptoService = serviceManager.get('CryptoService');
    const mailService = serviceManager.get('MailService');
    const authService = serviceManager.get('AuthService');

    return new AuthController(modelService, errorService, validatorService, cryptoService, mailService, authService, moment);
  }
}

module.exports = AuthControllerFactory;

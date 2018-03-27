// user/validator/factory/patch/TeacherAccountValidatorFactory.js

const FactoryInterface = require('../../../../appExtension/factory/FactoryInterface');

const TeacherAccountValidator = require('./../../patch/TeacherAccountValidator');


class TeacherAccountValidatorFactory extends FactoryInterface {


  /**
   * @param app
   * @return {TeacherAccountValidator}
   */
  constructor(app) {

    super(app);

    const errorService = this.getServiceManager().get('ErrorService');
    const modelService = this.getServiceManager().get('ModelService');
    const cryptoService = this.getServiceManager().get('CryptoService');

    return new TeacherAccountValidator(errorService, modelService, cryptoService);
  }
}

module.exports = TeacherAccountValidatorFactory;

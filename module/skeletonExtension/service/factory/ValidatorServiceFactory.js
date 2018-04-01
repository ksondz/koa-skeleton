// appExtension/service/factory/ValidatorServiceFactory.js

const FactoryInterface = require('./../../factory/FactoryInterface');

const ValidatorService = require('./../ValidatorService');


class ValidatorServiceFactory extends FactoryInterface {


  /**
   * @param app
   * @return {ValidatorService}
   */
  constructor(app) {

    super(app);

    const { validators } = this.getAppConfig();

    return new ValidatorService(app, validators);
  }
}

module.exports = ValidatorServiceFactory;

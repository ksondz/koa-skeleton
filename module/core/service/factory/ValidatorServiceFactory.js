

const FactoryInterface = require('./../../factory/FactoryInterface');

const ValidatorService = require('./../ValidatorService');


class ValidatorServiceFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {ValidatorService}
   */
  constructor(serviceManager) {

    super(serviceManager);

    return new ValidatorService(serviceManager);
  }
}

module.exports = ValidatorServiceFactory;

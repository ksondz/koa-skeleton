

const FactoryInterface = require('../../../factory/FactoryInterface');

const ValidatorManager = require('../ValidatorManager');


class ValidatorManagerFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {ValidatorManager}
   */
  constructor(serviceManager) {
    super(serviceManager);

    return new ValidatorManager(serviceManager.getServiceManagerConfig().validators, serviceManager);
  }
}

module.exports = ValidatorManagerFactory;

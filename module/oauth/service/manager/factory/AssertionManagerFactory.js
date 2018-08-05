

const FactoryInterface = require('../../../../core/factory/FactoryInterface');

const AssertionManager = require('../AssertionManager');


class AssertionManagerFactory extends FactoryInterface {

  /**
   * @param serviceManager
   * @return {AssertionManager}
   */
  constructor(serviceManager) {
    super(serviceManager);

    return new AssertionManager(serviceManager.getServiceManagerConfig().assertions, serviceManager);
  }
}

module.exports = AssertionManagerFactory;

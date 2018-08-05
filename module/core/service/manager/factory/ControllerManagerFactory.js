

const FactoryInterface = require('../../../factory/FactoryInterface');

const ControllerManager = require('../ControllerManager');


class ControllerManagerFactory extends FactoryInterface {

  /**
   * @param serviceManager
   * @return {ControllerManager}
   */
  constructor(serviceManager) {
    super(serviceManager);

    return new ControllerManager(serviceManager.getServiceManagerConfig().controllers, serviceManager);
  }
}

module.exports = ControllerManagerFactory;

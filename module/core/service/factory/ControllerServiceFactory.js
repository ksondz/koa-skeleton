

const FactoryInterface = require('./../../factory/FactoryInterface');

const ControllerService = require('./../ControllerService');


class ControllerServiceFactory extends FactoryInterface {

  /**
   * @param serviceManager
   * @return {ControllerService}
   */
  constructor(serviceManager) {
    super(serviceManager);

    return new ControllerService(serviceManager);
  }
}

module.exports = ControllerServiceFactory;



const ServiceManager = require('./manager/ServiceManager');


class ControllerService extends ServiceManager {

  /**
   * @param serviceManager
   */
  constructor(serviceManager) {
    super(serviceManager.getConfig(), serviceManager.getServiceManagerConfig().controllers, serviceManager);
  }

  /**
   * @param name
   * @param InstanceClass
   */
  initInstance(name, InstanceClass) {
    this.addInstance(name, new InstanceClass(this.getErrorService()));
  }
}

module.exports = ControllerService;

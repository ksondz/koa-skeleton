

const ServiceManager = require('./manager/ServiceManager');


class ValidatorService extends ServiceManager {

  /**
   * @param serviceManager
   */
  constructor(serviceManager) {
    super(serviceManager.getConfig(), serviceManager.getServiceManagerConfig().validators, serviceManager);

    this.serviceManager = serviceManager;
  }

  /**
   * @param name
   * @param InstanceClass
   */
  initInstance(name, InstanceClass) {
    this.addInstance(name, new InstanceClass(this.getErrorService()));
  }

  /**
   * @return {*}
   */
  getErrorService() {
    return this.serviceManager.get('ErrorService');
  }
}

module.exports = ValidatorService;



const ServiceManager = require('./ServiceManager');


class ControllerManager extends ServiceManager {

  /**
   * @param name
   * @param InstanceClass
   */
  initInstance(name, InstanceClass) {
    this.set(name, new InstanceClass(this.getErrorService()));
  }

  /**
   * @return {*}
   */
  getErrorService() {
    return this.serviceManager.get('ErrorService');
  }
}

module.exports = ControllerManager;

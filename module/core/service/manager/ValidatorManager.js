

const ServiceManager = require('./ServiceManager');


class ValidatorManager extends ServiceManager {

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
    return this.getCreationContext().get('ErrorService');
  }
}

module.exports = ValidatorManager;

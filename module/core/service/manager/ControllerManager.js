

const ServiceManager = require('./ServiceManager');


class ControllerManager extends ServiceManager {

  /**
   * @param name
   * @param InstanceClass
   */
  initInstance(name, InstanceClass) {
    this.set(name, new InstanceClass(this.getValidatorManager(), this.getModelService(), this.getErrorService()));
  }

  /**
   * @return {ValidatorManager}
   */
  getValidatorManager() {
    return this.getCreationContext().get('ValidatorManager');
  }

  /**
   * @return {ModelService}
   */
  getModelService() {
    return this.getCreationContext().get('ModelService');
  }

  /**
   * @return {ErrorService}
   */
  getErrorService() {
    return this.getCreationContext().get('ErrorService');
  }
}

module.exports = ControllerManager;



const ServiceManager = require('./../../../core/service/manager/ServiceManager');


class AssertionManager extends ServiceManager {


  /**
   * @param name
   * @param InstanceClass
   */
  initInstance(name, InstanceClass) {
    this.set(name, new InstanceClass(this.getErrorService(), this.getModelService(), this.getRoleResolverService()));
  }


  /**
   * @return {*}
   */
  getErrorService() {
    return this.getCreationContext().get('ErrorService');
  }

  /**
   * @return {*}
   */
  getModelService() {
    return this.getCreationContext().get('ModelService');
  }

  /**
   * @return {*}
   */
  getRoleResolverService() {
    return this.getCreationContext().get('RoleResolverService');
  }
}

module.exports = AssertionManager;

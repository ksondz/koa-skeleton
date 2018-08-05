

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
    return this.getServiceManager().get('ErrorService');
  }

  /**
   * @return {*}
   */
  getModelService() {
    return this.getServiceManager().get('ModelService');
  }

  /**
   * @return {*}
   */
  getRoleResolverService() {
    return this.getServiceManager().get('RoleResolverService');
  }
}

module.exports = AssertionManager;

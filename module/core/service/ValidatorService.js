// core/service/ValidatorService.js

const FactoryInterface = require('./../factory/FactoryInterface');

const ServiceManager = require('./ServiceManager');


class ValidatorService extends ServiceManager {

  /**
   * @param name
   * @return {*}
   */
  get(name) {

    const InstanceClass = this.getInstanceClass(name);
    let instance;

    if (InstanceClass.prototype instanceof FactoryInterface) {
      instance = new InstanceClass(this.app);
    } else {
      instance = new InstanceClass(this.getErrorService());
    }
    
    return instance;
  }


  /**
   * @return {*}
   */
  getErrorService() {
    return this.getServiceManager().get('ErrorService');
  }
}

module.exports = ValidatorService;

// appExtension/service/BaseService.js

const FactoryInterface = require('./../factory/FactoryInterface');


class BaseService {

  
  constructor(app, config) {

    this.app = app;
    this.config = config;
    
    this.instances = {};
  }


  /**
   * @param name
   * @return {*}
   */
  get(name) {

    if (!this.hasInstance(name)) {

      const InstanceClass = this.getInstanceClass(name);

      const instance = this.initInstance(InstanceClass);
      this.addInstance(name, instance);
    }

    return this.getInstance(name);
  }


  /**
   * @param InstanceClass
   */
  initInstance(InstanceClass) {
    return (InstanceClass.prototype instanceof FactoryInterface) ? new InstanceClass(this.app) : new InstanceClass();
  }

  /**
   * @param name
   * @return {*}
   */
  getInstanceClass(name) {

    if (!this.getConfig() || !this.getConfig()[name]) {
      throw new TypeError(`Instance with name ${name} does not exist`);
    }

    return this.getConfig()[name];
  }

  /**
   * @param name
   * @return {*}
   */
  hasInstance(name) {
    return (this.getInstances()[name]);
  }

  /**
   * @param name
   * @return {*}
   */
  getInstance(name) {
    return this.getInstances()[name];
  }

  /**
   * @param name
   * @param instance
   * @return {BaseService}
   */
  addInstance(name, instance) {

    this.getInstances()[name] = instance;

    return this;
  }

  /**
   * @return {{}}
   */
  getInstances() {
    return this.instances;
  }

  /**
   * Get Service Config
   */
  getConfig() {
    return this.config;
  }
  
  getServiceManager() {
    return this.getAppContext().getServiceManager();
  }
  
  getAppConfig() {
    return this.getAppContext().getAppConfig();
  }
  
  getAppContext() {
    return this.app.context;
  }
}

module.exports = BaseService;

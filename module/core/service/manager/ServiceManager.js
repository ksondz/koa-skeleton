

const FactoryInterface = require('../../factory/FactoryInterface');


class ServiceManager {


  /**
   * @param config
   * @param configClasses
   * @param factoryServiceManager
   */
  constructor(config, configClasses, factoryServiceManager) {
    this.config = config;
    this.configClasses = configClasses || this.getServiceManagerConfig().services;
    this.factoryServiceManager = factoryServiceManager || this;

    this.instances = {};
  }

  /**
   * @param name
   * @return {*}
   */
  get(name) {

    if (!this.hasInstance(name)) {

      const InstanceClass = this.getInstanceClass(name);

      if (InstanceClass.prototype instanceof FactoryInterface) {
        this.initInstanceFactory(name, InstanceClass);
      } else {
        this.initInstance(name, InstanceClass);
      }
    }

    return this.getInstance(name);
  }

  /**
   * @param name
   * @param InstanceClassFactory
   */
  initInstanceFactory(name, InstanceClassFactory) {
    this.addInstance(name, new InstanceClassFactory(this.factoryServiceManager));
  }

  /**
   * @param name
   * @param InstanceClass
   */
  initInstance(name, InstanceClass) {
    this.addInstance(name, new InstanceClass());
  }

  /**
   * @param name
   * @param instance
   * @return {*}
   */
  addInstance(name, instance) {
    this.getInstances()[name] = instance;
  }

  /**
   * @param name
   * @return {*}
   */
  getInstanceClass(name) {

    if (!this.getConfigClasses()[name]) {
      throw new TypeError(`Instance with name ${name} does not exist`);
    }

    return this.getConfigClasses()[name];
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

  /**
   * Get Service Config
   */
  getServiceManagerConfig() {
    return this.config.service_manager;
  }

  /**
   * @return {*|ECS.StringList|ECS.Services|Support.ServiceList|Health.serviceList|module.exports.service_manager.services}
   */
  getConfigClasses() {
    return this.configClasses;
  }
}

module.exports = ServiceManager;

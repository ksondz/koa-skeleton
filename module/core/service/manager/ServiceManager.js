

const FactoryInterface = require('../../factory/FactoryInterface');


class ServiceManager {

  /**
   * @param config
   * @param parentManager
   */
  constructor(config, parentManager) {

    this.config = config;
    this.creationContext = parentManager instanceof ServiceManager ? parentManager : this;

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
    this.set(name, new InstanceClassFactory(this.creationContext));
  }

  /**
   * @param name
   * @param InstanceClass
   */
  initInstance(name, InstanceClass) {
    this.set(name, new InstanceClass());
  }

  /**
   * @param name
   * @param instance
   * @return {*}
   */
  set(name, instance) {
    this.getInstances()[name] = instance;
  }

  /**
   * @param name
   * @return {*}
   */
  getInstanceClass(name) {

    if (!this.getConfig()[name]) {
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
   * @return {{}}
   */
  getInstances() {
    return this.instances;
  }

  /**
   * @return {*}
   */
  getConfig() {
    return this.config;
  }

  /**
   * @return {*}
   */
  getServiceManagerConfig() {
    return this.get('Config').service_manager;
  }
}

module.exports = ServiceManager;

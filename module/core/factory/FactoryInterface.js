

class FactoryInterface {


  /**
   * @param serviceManager
   */
  constructor(serviceManager) {
    this.serviceManager = serviceManager;
  }

  
  /**
   * @return {*}
   */
  getConfig() {
    return this.getServiceManager().get('Config');
  }

  /**
   * @return {*}
   */
  getServiceManager() {
    return this.serviceManager;
  }
}

module.exports = FactoryInterface;

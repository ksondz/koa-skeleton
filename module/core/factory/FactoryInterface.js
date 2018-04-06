// core/factory/FactoryInterface.js


class FactoryInterface {


  /**
   * @param app
   */
  constructor(app) {
    this.app = app;
  }
  
  /**
   * @return {*}
   */
  getAppConfig() {
    return this.getAppContext().getAppConfig();
  }

  /**
   * @return {*}
   */
  getServiceManager() {
    return this.getAppContext().getServiceManager();
  }

  /**
   * {*}
   */
  getAppContext() {
    return this.getApp().context;
  }

  /**
   * @return {*}
   */
  getApp() {
    return this.app;
  }
}

module.exports = FactoryInterface;

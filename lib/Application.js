
const fs = require('fs');

const deepmerge = require('deepmerge');

const ServiceManagerFactory = require('../module/core/service/manager/ServiceManagerFactory');


class Application {


  constructor(app, appConfig) {

    this.app = app;
    this.context = app.context;

    this.appConfig = appConfig;

    this.context.getAppConfig = () => {
      return this.appConfig;
    };
  }


  /**
   *
   * @return {Promise<void>}
   */
  async loadModules() {

    try {

      fs.readdirSync(this.getModulePath()).filter(file => ((file.indexOf('.') !== 0))).forEach((moduleName) => {
        this.mergeModuleConfig(moduleName);
      });

    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * @param moduleName
   */
  mergeModuleConfig(moduleName) {

    const configFolderPath = `${this.getModulePath(moduleName)}/config`;

    const moduleConfigs = [this.appConfig];

    fs.readdirSync(configFolderPath).filter(file => (((file.slice(-9) === 'config.js')))).forEach((configFile) => {
      moduleConfigs.push(require(`${configFolderPath}/${configFile}`));
    });

    this.appConfig = deepmerge.all(moduleConfigs);
  }

  /**
   * @param moduleName
   * @return {string}
   */
  getModulePath(moduleName = null) {
    return moduleName ? `${this.appConfig.modulePath}/${moduleName}` : this.appConfig.modulePath;
  }

  /**
   * @return {ServiceManager}
   */
  getServiceManager() {

    if (!Object.prototype.hasOwnProperty.call(this.getAppContext(), 'getServiceManager')) {

      const serviceManager = new ServiceManagerFactory(this.getApp());

      this.context.getServiceManager = () => {
        return serviceManager;
      };
    }

    return this.context.getServiceManager();
  }

  getAppConfig() {
    return this.appConfig;
  }

  getAppContext() {
    return this.context;
  }

  getApp() {
    return this.app;
  }
}

module.exports = Application;

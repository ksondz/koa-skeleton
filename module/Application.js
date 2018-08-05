

const Koa = require('koa');
const staticServer = require('koa-static-server');

const fs = require('fs');
const deepmerge = require('deepmerge');

const ServiceManager = require('./core/service/manager/ServiceManager');
const config = require('./../config/app.config');


class Application {

  /**
   * @return {string}
   * @constructor
   */
  static get MODULE_PATH() {
    return __dirname;
  }

  /**
   * Create new application instance and initialize modules configs
   */
  constructor() {
    this.app = new Koa();
    this.initModulesConfigs();
  }

  /**
   * @param port
   * @return {Promise<void>}
   */
  async listen(port) {
    await this.getApp().listen(port);
  }

  /**
   * @return {Promise<void>}
   */
  async init() {

    await this.getModelService().getSequelize().sync();

    // Top middleware is the error handler.
    this.getApp().use(this.getErrorService().handleError);

    this.getApp().use(this.getRouterService().getCors());
    this.getApp().use(this.getRouterService().getBodyParser());

    this.getApp().use(this.getAuthService().authorization);

    this.getApp().use(await this.getRouterService().getRoutes());

    this.getApp().use(staticServer(this.getConfig().staticServer));
  }

  initModulesConfigs() {

    try {

      fs.readdirSync(Application.MODULE_PATH)
        .filter(moduleName => ((moduleName.indexOf('.') !== 0)))
        .forEach((moduleName) => {
          const modulePath = `${Application.MODULE_PATH}/${moduleName}`;

          if (fs.lstatSync(modulePath).isDirectory()) {
            this.mergeModuleConfigs(`${modulePath}/config`);
          }
        });

      this.getContext().getConfig = () => {
        return this.getConfig();
      };

    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * @param moduleConfigPath
   */
  mergeModuleConfigs(moduleConfigPath) {

    fs.readdirSync(moduleConfigPath)
      .filter(fileName => (fileName.slice(-9) === 'config.js'))
      .forEach((fileName) => {
        this.config = deepmerge.all([this.getConfig(), require(`${moduleConfigPath}/${fileName}`)]);
      });
  }

  /**
   * @return {*}
   */
  getConfig() {

    if (!this.config) {
      this.config = config;
    }

    return this.config;
  }

  /**
   * @return {*}
   */
  getContext() {
    return this.getApp().context;
  }

  /**
   * @return {module.Application|*}
   */
  getApp() {
    return this.app;
  }

  /**
   * @return {ServiceManager}
   */
  getServiceManager() {

    if (!Object.prototype.hasOwnProperty.call(this.getContext(), 'getServiceManager')) {
      this.getContext().getServiceManager = () => {
        return new ServiceManager(this.getConfig());
      };
    }

    return this.getContext().getServiceManager();
  }

  /**
   * @return {RouterService}
   */
  getRouterService() {
    return this.getServiceManager().get('RouterService');
  }

  /**
   * @return {AuthService}
   */
  getAuthService() {
    return this.getServiceManager().get('AuthService');
  }

  /**
   * @return {ErrorService}
   */
  getErrorService() {
    return this.getServiceManager().get('ErrorService');
  }

  /**
   * @return {ModelService}
   */
  getModelService() {
    return this.getServiceManager().get('ModelService');
  }
}

module.exports = Application;

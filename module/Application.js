

const Koa = require('koa');
const staticServer = require('koa-static-server');

const fs = require('fs');
const deepmerge = require('deepmerge');

const appConfig = require('./../config/app.config');

const ServiceManager = require('./core/service/manager/ServiceManager');


class Application {


  /**
   * @return {Array}
   */
  static getModulePaths() {
    const modulePaths = [];

    fs.readdirSync(__dirname)
      .filter(moduleName => (fs.lstatSync(`${__dirname}/${moduleName}`).isDirectory()))
      .forEach((moduleName) => {
        modulePaths.push(`${__dirname}/${moduleName}`);
      });

    return modulePaths;
  }

  /**
   * @return {*}
   */
  static getModuleConfigs() {
    let moduleConfigs = {};

    Application.getModulePaths().forEach((modulePath) => {
      const moduleConfigPath = `${modulePath}/config`;

      fs.readdirSync(moduleConfigPath)
        .filter(fileName => (fileName.slice(-9) === 'config.js'))
        .forEach((fileName) => {
          const moduleConfig = require(`${moduleConfigPath}/${fileName}`);
          moduleConfigs = deepmerge.all([moduleConfigs, moduleConfig]);
        });
    });

    return moduleConfigs;
  }


  /**
   * Create new application instance and initialize modules configs
   */
  constructor() {
    this.app = new Koa();

    const moduleConfig = Application.getModuleConfigs();
    const serviceManager = this.initServiceManager(moduleConfig.service_manager.services);

    serviceManager.set('Config', deepmerge.all([appConfig, moduleConfig]));
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

    this.getApp().use(this.getOAuthService().authorization);

    this.getApp().use(await this.getRouterService().getRoutes());

    this.getApp().use(staticServer(this.getConfig().staticServer));
  }

  /**
   * @param config
   * @return {ServiceManager}
   */
  initServiceManager(config) {
    const serviceManager = new ServiceManager(config);

    this.getContext().getServiceManager = () => {
      return serviceManager;
    };

    return serviceManager;
  }

  /**
   * @return {ServiceManager}
   */
  getServiceManager() {
    return this.getContext().getServiceManager();
  }

  /**
   * @return {*}
   */
  getConfig() {
    return this.getServiceManager().get('Config');
  }

  /**
   * @return {RouterService}
   */
  getRouterService() {
    return this.getServiceManager().get('RouterService');
  }

  /**
   * @return {OAuthService}
   */
  getOAuthService() {
    return this.getServiceManager().get('OAuthService');
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

  /**
   * @return {module.Application|*}
   */
  getApp() {
    return this.app;
  }

  /**
   * @return {*}
   */
  getContext() {
    return this.getApp().context;
  }
}

module.exports = Application;



const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');

const FactoryInterface = require('./../factory/FactoryInterface');


class RouterService {


  /**
   * @param router
   * @param serviceManager
   */
  constructor(router, serviceManager) {
    this.router = router;
    this.serviceManager = serviceManager;

    this.bodyParserOptions = { multipart: true, strict: true };
    this.corsOptions = {
      methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    };
  }

  /**
   * @return {Promise<Function>}
   */
  async getRoutes() {
    await this.initRoutes();

    return this.router.routes();
  }

  /**
   * @return {Promise<void>}
   */
  async initRoutes() {
    const { routes } = this.getRouterConfig();
    await Object.keys(routes).forEach((routeKey) => {
      this.getInstance(routes[routeKey]).init();
    });
  }

  /**
   * @param InstanceClass
   */
  getInstance(InstanceClass) {

    if (InstanceClass.prototype instanceof FactoryInterface) {
      return new InstanceClass(this.serviceManager);
    }

    return new InstanceClass(this.router, this.getRouterConfig(), this.getControllerManager(), this.getAssertionManager(), this.getRoleResolverService());
  }

  /**
   * @return {Router}
   */
  getRouter() {
    return this.router;
  }


  /**
   * @return {*}
   */
  getRouterConfig() {
    return this.getConfig().router;
  }

  /**
   * @return {*}
   */
  getBodyParser() {
    return bodyParser(this.bodyParserOptions);
  }

  /**
   * @return {*}
   */
  getCors() {
    return cors(this.corsOptions);
  }

  /**
   * @return {*}
   */
  getConfig() {
    return this.serviceManager.get('Config');
  }

  /**
   * @return {ControllerManager}
   */
  getControllerManager() {
    return this.serviceManager.get('ControllerManager');
  }

  /**
   * @return {AssertionManager}
   */
  getAssertionManager() {
    return this.serviceManager.get('AssertionManager');
  }

  /**
   * @return {RoleResolverService}
   */
  getRoleResolverService() {
    return this.serviceManager.get('RoleResolverService');
  }
}

module.exports = RouterService;

// appExtension/service/RouterService.js


const FactoryInterface = require('./../factory/FactoryInterface');

const BaseService = require('./BaseService');


class RouterService extends BaseService {


  /**
   *
   * @param app
   * @param routes
   * @param router
   */
  constructor(app, routes, router) {

    super(app, routes);

    this.router = router;
  }
  

  /**
   * @return {Promise<void>}
   */
  async initRoutes() {

    const routes = this.getConfig();

    await Object.keys(routes).forEach((routeName) => {

      const route = this.get(routeName);

      route.init();
    });
  }

  
  /**
   * @param InstanceClass
   */
  initInstance(InstanceClass) {

    let instance;

    if (InstanceClass.prototype instanceof FactoryInterface) {
      instance = new InstanceClass(this.app);
    } else {
      instance = new InstanceClass(this.getControllerService(), this, this.getRoleResolverService());
    }

    return instance;
  }

  /**
   * @return {Router}
   */
  getRouter() {
    return this.router;
  }

  /**
   * @return {Router}
   */
  getBaseApi() {
    return this.getRouterConfig().baseApi;
  }

  /**
   * @return {*}
   */
  getControllerService() {
    return this.getServiceManager().get('ControllerService');
  }

  /**
   * @return {*}
   */
  getRoleResolverService() {
    return this.getServiceManager().get('RoleResolverService');
  }

  /**
   * @return {*}
   */
  getRouterConfig() {
    return this.getAppConfig().router;
  }
}

module.exports = RouterService;



class BaseRoute {


  /**
   * @param router
   * @param routerConfig
   * @param controllerManager
   * @param assertionManager
   * @param roleResolverService
   */
  constructor(router, routerConfig, controllerManager, assertionManager, roleResolverService) {
    this.router = router;
    this.routerConfig = routerConfig;

    this.controllerManager = controllerManager;
    this.assertionManager = assertionManager;
    this.roleResolverService = roleResolverService;
  }


  init() {
    this.getRouter().prefix('/');
  }

  /**
   * @param subPath
   * @return {*}
   */
  getApiPath(subPath) {

    let apiPath = `/${this.getBaseApi()}`;

    if (subPath) {
      apiPath += subPath;
    }

    return apiPath;
  }

  /**
   * @return {*|Router}
   */
  getRouter() {
    return this.router;
  }

  /**
   * @return {*|Router}
   */
  getBaseApi() {
    return this.routerConfig.baseApi;
  }

  /**
   * {RoleResolverService}
   */
  getRoleResolverService() {
    return this.roleResolverService;
  }

  /**
   * @return {ControllerManager}
   */
  getControllerManager() {
    return this.controllerManager;
  }

  /**
   * @return {AssertionManager}
   */
  getAssertionManager() {
    return this.assertionManager;
  }

  /**
   * @param controllerName
   * @return {*}
   */
  getControllerActions(controllerName) {
    const controller = this.getControllerManager().get(controllerName);
    return controller.getActions();
  }
}


module.exports = BaseRoute;

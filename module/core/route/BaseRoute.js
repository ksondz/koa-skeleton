

class BaseRoute {


  /**
   * @param router
   * @param routerConfig
   * @param controllerManager
   * @param roleResolverService
   */
  constructor(router, routerConfig, controllerManager, roleResolverService) {
    this.router = router;
    this.routerConfig = routerConfig;

    this.controllerManager = controllerManager;
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
   * @return {controllerManager}
   */
  getControllerManager() {
    return this.controllerManager;
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

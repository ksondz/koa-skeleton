

class BaseRoute {


  /**
   * @param router
   * @param routerConfig
   * @param controllerService
   * @param roleResolverService
   */
  constructor(router, routerConfig, controllerService, roleResolverService) {
    this.router = router;
    this.routerConfig = routerConfig;

    this.controllerService = controllerService;
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
   * @return {ControllerService}
   */
  getControllerService() {
    return this.controllerService;
  }
}


module.exports = BaseRoute;

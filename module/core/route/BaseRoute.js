// core/route/BaseRoute.js


class BaseRoute {

  init() {
    throw this.getControllerService().getErrorService().createServerError('init method should be defined for each route');
  }


  /**
   * @param controllerService
   * @param routerService
   * @param roleResolverService
   */
  constructor(controllerService, routerService, roleResolverService) {

    this.controllerService = controllerService;
    this.routerService = routerService;
    this.roleResolverService = roleResolverService;

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
    return this.getRouterService().getRouter();
  }


  /**
   * @return {*|Router}
   */
  getBaseApi() {
    return this.getRouterService().getBaseApi();
  }

  /**
   * {RoleResolverService}
   */
  getRouterService() {
    return this.routerService;
  }

  /**
   * {RoleResolverService}
   */
  getRoleResolverService() {
    return this.roleResolverService;
  }

  getControllerService() {
    return this.controllerService;
  }
}


module.exports = BaseRoute;

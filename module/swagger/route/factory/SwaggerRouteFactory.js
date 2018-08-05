

const FactoryInterface = require('../../../core/factory/FactoryInterface');

const SwaggerRoute = require('./../SwaggerRoute');

const koaSwagger = require('koa2-swagger-ui');


class SwaggerRouteFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {SwaggerRoute}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const controllerService = serviceManager.get('ControllerService');
    const roleResolverService = serviceManager.get('RoleResolverService');
    const RouterService = serviceManager.get('RouterService');

    return new SwaggerRoute(RouterService.getRouter(), RouterService.getRouterConfig(), controllerService, roleResolverService, koaSwagger, this.getSwaggerConfig());
  }


  /**
   * @return {*|{title, oauthOptions, swaggerOptions, routePrefix, hideTopbar}}
   */
  getSwaggerConfig() {
    const routerConfig = this.getConfig().router.host;

    return this.getConfig().swagger.getSwaggerConfig(routerConfig.host, routerConfig.port);
  }
}

module.exports = SwaggerRouteFactory;

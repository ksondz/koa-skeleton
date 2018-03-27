// swagger/route/factory/SwaggerRouteFactory.js

const FactoryInterface = require('./../../../appExtension/factory/FactoryInterface');

const SwaggerRoute = require('./../SwaggerRoute');

const koaSwagger = require('koa2-swagger-ui');


class SwaggerRouteFactory extends FactoryInterface {

  constructor(app) {

    super(app);

    const controllerService = this.getServiceManager().get('ControllerService');
    const routerService = this.getServiceManager().get('RouterService');
    const roleResolverService = this.getServiceManager().get('RoleResolverService');

    return new SwaggerRoute(controllerService, routerService, roleResolverService, koaSwagger, this.getSwaggerConfig());
  }


  /**
   * @return {*|{title, oauthOptions, swaggerOptions, routePrefix, hideTopbar}}
   */
  getSwaggerConfig() {
    const routerConfig = this.getAppConfig().router.host;

    return this.getAppConfig().swagger.getSwaggerConfig(routerConfig.host, routerConfig.port);
  }
}

module.exports = SwaggerRouteFactory;



const BaseRoute = require('../../core/route/BaseRoute');


class SwaggerRoute extends BaseRoute {


  constructor(router, routerConfig, controllerService, roleResolverService, koaSwagger, swaggerConfig) {

    super(router, routerConfig, controllerService, roleResolverService);

    this.koaSwagger = koaSwagger;
    this.swaggerConfig = swaggerConfig;
  }


  init() {
    super.init();

    const swaggerPath = this.getApiPath('/swagger');
    this.getRouter().get(`${swaggerPath}`, this.koaSwagger(this.swaggerConfig));
  }
}


module.exports = SwaggerRoute;

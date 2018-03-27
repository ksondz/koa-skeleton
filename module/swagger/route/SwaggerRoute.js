// swagger/route/SwaggerRoute.js

const BaseRoute = require('./../../appExtension/route/BaseRoute');


class SwaggerRoute extends BaseRoute {


  constructor(controllerService, routerService, roleResolverService, koaSwagger, swaggerConfig) {

    super(controllerService, routerService, roleResolverService);

    this.koaSwagger = koaSwagger;
    this.swaggerConfig = swaggerConfig;
  }


  init() {

    const swaggerPath = this.getApiPath('/swagger');
    const router = this.getRouter();

    router.get(`${swaggerPath}`, this.koaSwagger(this.swaggerConfig));
  }
}


module.exports = SwaggerRoute;

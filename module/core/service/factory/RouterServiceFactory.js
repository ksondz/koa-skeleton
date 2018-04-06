// core/service/factory/RouterServiceFactory.js

const Router = require('koa-router');

const FactoryInterface = require('./../../factory/FactoryInterface');

const RouterService = require('./../RouterService');


class RouterServiceFactory extends FactoryInterface {


  /**
   * @param app
   * @return {RouterService}
   */
  constructor(app) {

    super(app);

    const routerConfig = app.context.getAppConfig().router;
    const { routes } = routerConfig;

    const router = new Router();

    return new RouterService(app, routes, router);
  }
}

module.exports = RouterServiceFactory;

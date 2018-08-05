

const Router = require('koa-router');

const FactoryInterface = require('./../../factory/FactoryInterface');

const RouterService = require('./../RouterService');


class RouterServiceFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {RouterService}
   */
  constructor(serviceManager) {
    super(serviceManager);

    const router = new Router();

    return new RouterService(router, serviceManager);
  }
}

module.exports = RouterServiceFactory;

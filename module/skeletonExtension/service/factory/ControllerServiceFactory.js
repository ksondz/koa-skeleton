// appExtension/service/factory/ControllerServiceFactory.js

const FactoryInterface = require('./../../factory/FactoryInterface');

const ControllerService = require('./../ControllerService');


class ControllerServiceFactory extends FactoryInterface {


  /**
   * @param app
   * @return {ControllerService}
   */
  constructor(app) {

    super(app);

    const appConfig = this.getAppConfig();

    return new ControllerService(app, appConfig.controllers);
  }
}

module.exports = ControllerServiceFactory;

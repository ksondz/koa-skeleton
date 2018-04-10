// core/service/factory/ServiceManagerFactory.js

const ServiceManager = require('./ServiceManager');


class ServiceManagerFactory {

  constructor(app) {

    const appConfig = app.context.getAppConfig();
    const serviceManagerConfig = appConfig.service_manager;

    return new ServiceManager(app, serviceManagerConfig.services);
  }
}

module.exports = ServiceManagerFactory;

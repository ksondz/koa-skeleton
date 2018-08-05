

module.exports = {
  service_manager: {
    services: {
      ValidatorManager: require('../service/manager/factory/ValidatorManagerFactory'),
      ControllerManager: require('../service/manager/factory/ControllerManagerFactory'),

      ModelService: require('../service/factory/ModelServiceFactory'),
      RouterService: require('../service/factory/RouterServiceFactory'),
      MailService: require('../../core/service/factory/MailServiceFactory'),
    },

    controllers: {},

    validators: {},
  },
  router: {
    routes: {},
  },
};



module.exports = {
  service_manager: {
    services: {
      ValidatorService: require('..//service/factory/ValidatorServiceFactory'),
      ModelService: require('..//service/factory/ModelServiceFactory'),
      RouterService: require('..//service/factory/RouterServiceFactory'),
      ControllerService: require('..//service/factory/ControllerServiceFactory'),

      MailService: require('../../core/service/factory/MailServiceFactory'),
    },

    controllers: {},

    validators: {},
  },
  router: {
    routes: {},
  },
};

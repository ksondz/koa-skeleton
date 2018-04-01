// appExtension/config/service.config.js

const ValidatorServiceFactory = require('..//service/factory/ValidatorServiceFactory');
const ModelServiceFactory = require('..//service/factory/ModelServiceFactory');
const RouterServiceFactory = require('..//service/factory/RouterServiceFactory');
const ControllerServiceFactory = require('..//service/factory/ControllerServiceFactory');

module.exports = {
  service_manager: {
    services: {
      ValidatorService: ValidatorServiceFactory,
      ModelService: ModelServiceFactory,
      RouterService: RouterServiceFactory,
      ControllerService: ControllerServiceFactory,
    },
  },
};

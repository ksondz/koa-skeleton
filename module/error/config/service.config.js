// error/config/service.config.js


const ErrorServiceFactory = require('./../service/factory/ErrorServiceFactory');

module.exports = {
  service_manager: {
    services: {
      ErrorService: ErrorServiceFactory,
    },
  },
};

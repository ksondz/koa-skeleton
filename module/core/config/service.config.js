// core/config/service.config.js

const MailServiceFactory = require('./../service/factory/MailServiceFactory');


module.exports = {
  service_manager: {
    services: {
      MailService: MailServiceFactory,
    },
  },
};

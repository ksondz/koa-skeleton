

module.exports = {
  service_manager: {
    services: {
    },

    controllers: {
      AccountController: require('./../controller/factory/AccountControllerFactory'),
    },

    validators: {
    },
  },

  routes: {
    AccountRoute: require('./../route/AccountRoute'),
  },
};

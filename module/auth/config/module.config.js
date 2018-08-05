

module.exports = {
  service_manager: {
    services: {
      AuthService: require('./../../auth/service/factory/AuthServiceFactory'),
      CryptoService: require('./../../auth/service/factory/CryptoServiceFactory'),

      RoleResolverService: require('./../../auth/service/factory/RoleResolverServiceFactory'),
    },

    controllers: {
      AuthController: require('./../controller/factory/AuthControllerFactory'),
    },

    validators: {
      PasswordValidator: require('../validator/PasswordValidator'),

      RegistrationValidator: require('../validator/factory/RegistrationValidatorFactory'),
      LoginValidator: require('../validator/factory/LoginValidatorFactory'),
      ForgotPasswordValidator: require('../validator/factory/ForgotPasswordValidatorFactory'),
      AuthValidator: require('../validator/factory/AuthValidatorFactory'),
    },
  },

  router: {
    routes: {
      AuthRoute: require('./../route/AuthRoute'),
    },
  },

};

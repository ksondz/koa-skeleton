

module.exports = {
  service_manager: {
    services: {
      OAuthService: require('../service/factory/OAuthServiceFactory'),
      CryptoService: require('../service/factory/CryptoServiceFactory'),

      RoleResolverService: require('../service/factory/RoleResolverServiceFactory'),
    },

    controllers: {
      OAuthController: require('../controller/factory/OAuthControllerFactory'),
    },

    validators: {
      OAuthTypeValidator: require('../validator/OAuthTypeValidator'),
      OAuthRefreshTokenValidator: require('../validator/OAuthRefreshTokenValidator'),
      OAuthValidator: require('../validator/factory/OAuthValidatorFactory'),

      PasswordValidator: require('../validator/PasswordValidator'),
      RegistrationValidator: require('../validator/factory/RegistrationValidatorFactory'),
      LoginValidator: require('../validator/factory/LoginValidatorFactory'),
      ForgotPasswordValidator: require('../validator/factory/ForgotPasswordValidatorFactory'),
    },

    assertions: {},
  },

  router: {
    routes: {
      OAuthRoute: require('../route/OAuthRoute'),
    },
  },

};

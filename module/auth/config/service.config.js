// auth/config/service.config.js


const AuthServiceFactory = require('./../../auth/service/factory/AuthServiceFactory');
const CryptoServiceFactory = require('./../../auth/service/factory/CryptoServiceFactory');
const RoleResolverServiceFactory = require('./../../auth/service/factory/RoleResolverServiceFactory');

module.exports = {
  service_manager: {
    services: {
      AuthService: AuthServiceFactory,
      CryptoService: CryptoServiceFactory,

      RoleResolverService: RoleResolverServiceFactory,
    },
  },
};

// oauth/config/service.config.js


const OAuthServiceFactory = require('./../../auth/service/factory/OAuthServiceFactory');
const CryptoServiceFactory = require('./../../auth/service/factory/CryptoServiceFactory');
const RoleResolverServiceFactory = require('./../../auth/service/factory/RoleResolverServiceFactory');

module.exports = {
  service_manager: {
    services: {
      OAuthService: OAuthServiceFactory,
      CryptoService: CryptoServiceFactory,

      RoleResolverService: RoleResolverServiceFactory,
    },
  },
};

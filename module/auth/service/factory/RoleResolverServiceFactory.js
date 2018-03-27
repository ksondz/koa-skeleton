// auth/service/factory/RoleResolverServiceFactory.js


const FactoryInterface = require('./../../../appExtension/factory/FactoryInterface');

const RoleResolverService = require('./../RoleResolverService');


class RoleResolverServiceFactory extends FactoryInterface {


  /**
   * @param app
   * @return {RoleResolverService}
   */
  constructor(app) {

    super(app);

    const errorService = this.getServiceManager().get('ErrorService');

    return new RoleResolverService(errorService);
  }
}

module.exports = RoleResolverServiceFactory;

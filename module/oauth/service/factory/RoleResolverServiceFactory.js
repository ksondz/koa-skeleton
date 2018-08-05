

const FactoryInterface = require('../../../core/factory/FactoryInterface');

const RoleResolverService = require('./../RoleResolverService');


class RoleResolverServiceFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {RoleResolverService}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const errorService = this.getServiceManager().get('ErrorService');

    return new RoleResolverService(errorService);
  }
}

module.exports = RoleResolverServiceFactory;

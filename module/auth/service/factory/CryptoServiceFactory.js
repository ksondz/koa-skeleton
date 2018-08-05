

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const FactoryInterface = require('../../../core/factory/FactoryInterface');

const CryptoService = require('./../CryptoService');


class CryptoServiceFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {CryptoService}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const errorService = this.getServiceManager().get('ErrorService');

    return new CryptoService(errorService, bcrypt, crypto);
  }
}

module.exports = CryptoServiceFactory;

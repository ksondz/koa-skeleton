// auth/service/factory/CryptoServiceFactory.js

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const saltRounds = 10;
const encoding = 'hex';

const FactoryInterface = require('../../../skeletonExtension/factory/FactoryInterface');

const CryptoService = require('./../CryptoService');


class CryptoServiceFactory extends FactoryInterface {


  /**
   * @param app
   * @return {CryptoService}
   */
  constructor(app) {

    super(app);

    const errorService = this.getServiceManager().get('ErrorService');

    return new CryptoService(errorService, bcrypt, crypto, saltRounds, encoding);
  }
}

module.exports = CryptoServiceFactory;

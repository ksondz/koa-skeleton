// error/validator/factory/ErrorServiceFactory.js


const FactoryInterface = require('../../../appExtension/factory/FactoryInterface');

const ErrorService = require('./../ErrorService');


class ErrorServiceFactory extends FactoryInterface {


  /**
   * @param app
   * @return {ErrorService}
   */
  constructor(app) {

    super(app);

    return new ErrorService(app);
  }
}

module.exports = ErrorServiceFactory;

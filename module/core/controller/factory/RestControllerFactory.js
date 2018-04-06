// core/controller/factory/RestControllerFactory.js


const FactoryInterface = require('./../../factory/FactoryInterface');

const RestController = require('./../RestController');


class RestControllerFactory extends FactoryInterface {


  /**
   * @param app
   * @return {RestController}
   */
  constructor(app) {

    super(app);

    const modelService = this.getServiceManager().get('ModelService');
    const validatorService = this.getServiceManager().get('ValidatorService');

    return new RestController(modelService, validatorService);
  }
}

module.exports = RestControllerFactory;

// user/controller/factory/StudentControllerFactory.js


const FactoryInterface = require('./../../../appExtension/factory/FactoryInterface');

const StudentController = require('./../StudentController');


class StudentControllerFactory extends FactoryInterface {


  /**
   * @param app
   * @return {StudentController}
   */
  constructor(app) {

    super(app);

    const modelService = this.getServiceManager().get('ModelService');
    const validatorService = this.getServiceManager().get('ValidatorService');

    return new StudentController(modelService, validatorService);
  }
}

module.exports = StudentControllerFactory;

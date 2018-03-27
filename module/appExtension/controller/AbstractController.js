// appExtension/server/controllers/AbstractController.js


class AbstractController {


  static get GET_RESPONSE_STATUS() {
    return 200;
  }

  static get POST_RESPONSE_STATUS() {
    return 201;
  }

  static get DELETE_RESPONSE_STATUS() {
    return 204;
  }

  /**
   * @param items
   * @param callback
   * @return {Promise<void>}
   */
  static async asyncForEach(items, callback) {
    const promises = [];

    items.forEach((item) => {
      promises.push(callback(item));
    });

    await Promise.all(promises);
  }


  /**
   * @param modelService
   * @param validatorService
   */
  constructor(modelService, validatorService) {
    this.modelService = modelService;
    this.validatorService = validatorService;
  }


  /**
   * Method should be defined for each extended controller
   */
  getActions() {
    throw this.getErrorService().createServerError('getActions method should be defined for each extended controller');
  }

  /**
   * @return ErrorService
   */
  getErrorService() {
    return this.getValidatorService().getErrorService();
  }

  /**
   * @return ModelService
   */
  getModelService() {
    return this.modelService;
  }

  /**
   * @return ValidatorService
   */
  getValidatorService() {
    return this.validatorService;
  }
}

module.exports = AbstractController;

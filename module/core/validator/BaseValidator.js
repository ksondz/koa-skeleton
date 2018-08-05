

const Joi = require('joi');


class BaseValidator {


  constructor(errorService) {
    this.errorService = errorService;
    
    this.joi = Joi;

    this.schema = {};
    this.options = {
      allowUnknown: true,
    };
  }

  /**
   * @param data
   * @return {Promise<void>}
   */
  async validate(data) {

    const joiBuilder = this.getJoiBuilder();

    const schema = this.getSchema();
    const options = this.getOptions();

    try {
      return await joiBuilder.validate(data, schema, options);
    } catch (err) {

      const messages = {};

      err.details.forEach((error) => {
        const propertyName = error.context.key;
        // TODO custom message
        messages[propertyName] = error.message.replace(/" "/, '').trim();
      });

      throw this.getErrorService().createValidationError(messages);
    }
  }

  /**
   * @return {{}}
   */
  getSchema() {
    return this.schema;
  }

  /**
   * @return {{}}
   */
  getOptions() {
    return this.options;
  }

  /**
   * @return {*|ErrorService}
   */
  getErrorService() {
    return this.errorService;
  }

  /**
   * @return {*}
   */
  getJoiBuilder() {
    return this.joi;
  }
}

module.exports = BaseValidator;

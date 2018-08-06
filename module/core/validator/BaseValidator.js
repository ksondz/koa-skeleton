

const Joi = require('joi');


class BaseValidator {


  /**
   * @return {string}
   * @constructor
   */
  static get STRING_LABEL() {
    return 'Property should be string';
  }

  /**
   * @return {string}
   * @constructor
   */
  static get STRING_REQUIRED_LABEL() {
    return 'Property is required and should be string';
  }

  /**
   * @return {string}
   * @constructor
   */
  static get INTEGER_LABEL() {
    return 'Property should be integer';
  }

  /**
   * @return {string}
   * @constructor
   */
  static get INTEGER_REQUIRED_LABEL() {
    return 'Property is required and should be integer';
  }


  /**
   * @param errorService
   */
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
        const { key, label } = error.context;

        messages[key] = label !== key ? label : error.message.replace(/" "/, '').trim();
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

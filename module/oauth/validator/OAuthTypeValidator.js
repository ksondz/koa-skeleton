

const BaseValidator = require('./../../core/validator/BaseValidator');

const TokenTypeEnum = require('./../enum/TokenTypeEnum');


class OAuthTypeValidator extends BaseValidator {


  /**
   * @return {*}
   */
  getSchema() {
    const joiBuilder = this.getJoiBuilder();

    return joiBuilder.object().keys({
      type: joiBuilder.string().only([TokenTypeEnum.ACCESS_TOKEN_TYPE, TokenTypeEnum.REFRESH_TOKEN_TYPE]).required(),
    });
  }
}

module.exports = OAuthTypeValidator;

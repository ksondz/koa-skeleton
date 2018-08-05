

const BaseValidator = require('./../../core/validator/BaseValidator');

const TokenTypeEnum = require('./../enum/TokenTypeEnum');


class OAuthRefreshTokenValidator extends BaseValidator {


  /**
   * @return {*}
   */
  getSchema() {
    const joiBuilder = this.getJoiBuilder();

    return joiBuilder.object().keys({
      token: joiBuilder.string().required(),
      type: joiBuilder.string().only([TokenTypeEnum.REFRESH_TOKEN_TYPE]).required(),
    });
  }
}

module.exports = OAuthRefreshTokenValidator;

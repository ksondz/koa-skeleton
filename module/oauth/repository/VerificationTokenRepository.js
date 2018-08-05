
const BaseRepository = require('./../../core/repository/BaseRepository');

const TokenTypeEnum = require('./../enum/TokenTypeEnum');


class VerificationTokenRepository extends BaseRepository {


  /**
   * @param token
   * @return {Promise<*|null>}
   */
  async findRegistrationTokenByToke(token) {

    const result =  await super.findOne({
      where: {
        token,
        type: TokenTypeEnum.REGISTER_TOKEN_TYPE,
      },
    });

    return result || null;
  }

  /**
   * @param token
   * @return {Promise<*|null>}
   */
  async findForgotTokenByToke(token) {

    const result =  await super.findOne({
      where: {
        token,
        type: TokenTypeEnum.FORGOT_TOKEN_TYPE,
      },
    });

    return result || null;
  }


  /**
   * @param userId
   * @return {Promise<*>}
   */
  async findUserAccessTokensByUserId(userId) {

    const result = await super.findAll({
      where: {
        user_id: userId,
        type: TokenTypeEnum.ACCESS_TOKEN_TYPE,
      },
    });

    return result || [];
  }

  /**
   * @param token
   * @return {Promise<*>}
   */
  async findAccessTokenByToken(token) {

    const result = await super.findOne({
      where: {
        token,
        type: TokenTypeEnum.ACCESS_TOKEN_TYPE,
      },
    });

    return result || null;
  }

  /**
   * @param token
   * @return {Promise<*>}
   */
  async findRefreshTokenByToken(token) {

    const result = await super.findOne({
      where: {
        token,
        type: TokenTypeEnum.REFRESH_TOKEN_TYPE,
      },
    });

    return result || null;
  }
}

module.exports = VerificationTokenRepository;


const BaseRepository = require('./../../appExtension/repository/BaseRepository');

const TokenTypeEnum = require('./../enum/TokenTypeEnum');


class AccessTokenRepository extends BaseRepository {


  /**
   * @param token
   * @return {Promise<*|null>}
   */
  async findToken(token) {

    const result =  await super.findOne({
      where: { token },
    });

    return result || null;
  }


  /**
   * @param userId
   * @return {Promise<*>}
   */
  async findUserAccessTokens(userId) {

    const result = await super.findAll({
      where: {
        user_id: userId,
        type: TokenTypeEnum.ACCESS_TYPE,
      },
    });

    return result || [];
  }

  /**
   * @param token
   * @return {Promise<*>}
   */
  async findAccessToken(token) {

    const result = await super.findOne({
      where: {
        token,
        type: TokenTypeEnum.ACCESS_TYPE,
      },
    });

    return result || null;
  }

  /**
   * @param token
   * @return {Promise<*>}
   */
  async findRefreshToken(token) {

    const result = await super.findOne({
      where: {
        token,
        type: TokenTypeEnum.REFRESH_TYPE,
      },
    });

    return result || null;
  }

}

module.exports = AccessTokenRepository;

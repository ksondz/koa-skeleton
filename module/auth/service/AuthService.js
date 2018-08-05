

const { sign, verify } = require('jsonwebtoken');

const UserRoleEnum = require('./../../user/enum/UserRoleEnum');


class AuthService {

  /**
   * @return {string}
   * @constructor
   */
  static get TOKEN_IS_NOT_FOUNT_MESSAGE() {
    return 'Token is not found';
  }

  /**
   * @return {string}
   * @constructor
   */
  static get USER_IS_NOT_FOUNT_MESSAGE() {
    return 'User is not found';
  }

  /**
   * @return {string}
   * @constructor
   */
  static get REFRESH_TOKEN_IS_NOT_FOUNT_MESSAGE() {
    return 'Refresh token is not found';
  }

  /**
   * @return {string}
   * @constructor
   */
  static get REFRESH_TOKEN_IS_EXPIRED() {
    return 'Refresh token is expired';
  }


  /**
   * @param errorService
   * @param modelService
   * @param jwtConfig
   */
  constructor(errorService, modelService, jwtConfig) {
    this.errorService = errorService;
    this.modelService = modelService;

    this.jwtConfig = jwtConfig;

    this.authorization = this.authorization.bind(this);
  }

  /**
   * @param user
   * @param options
   * @return {*}
   */
  generateToken(user, options = {}) {

    const extractedUser = this.getUserExtractor().extract(user);

    options = options || this.jwtConfig.options;
    return sign(extractedUser, this.jwtConfig.secret, options);
  }

  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async authorization(ctx, next) {

    const authorizationHeader = ctx.headers.authorization;

    ctx.state.role = UserRoleEnum.GUEST_ROLE;

    if (authorizationHeader) {

      const authToken = authorizationHeader.replace('Bearer ', '');

      await verify(authToken, this.jwtConfig.secret, async (err) => {
        if (err) {
          throw this.getErrorService().createNotAuthorizedError(err.message);
        }
      });

      const accessToken = await this.getAccessTokenRepository().findAccessToken(authToken);

      if (!accessToken) {
        throw this.getErrorService().createNotAuthorizedError(AuthService.TOKEN_IS_NOT_FOUNT_MESSAGE);
      }

      const user = await this.getUserRepository().findById(accessToken.userId);

      if (!user) {
        throw this.getErrorService().createNotAuthorizedError(AuthService.USER_IS_NOT_FOUNT_MESSAGE);
      }

      ctx.state.role = user.role;
      ctx.state.user = user;
      ctx.state.token = accessToken;
    }

    await next();
  }


  /**
   * @param token
   * @return {Promise<boolean>}
   */
  async validateRefreshToken(token) {

    const refreshToken = await this.getAccessTokenRepository().findRefreshToken(token);

    switch (true) {
      case (!refreshToken):
        throw this.getErrorService().createNotAuthorizedError(AuthService.REFRESH_TOKEN_IS_NOT_FOUNT_MESSAGE);
        // TODO: move condition inside AccessToken model
      case (refreshToken.expiredAt < (Date.now())):
        await this.getAccessTokenRepository().destroyById(refreshToken.id);

        throw this.getErrorService().createNotAuthorizedError(AuthService.REFRESH_TOKEN_IS_EXPIRED);

      default:
        return true;
    }
  }


  /**
   * @return {*}
   */
  getAccessTokenRepository() {
    return this.modelService.get('AccessToken').getRepository();
  }

  /**
   * @return ErrorService
   */
  getErrorService() {
    return this.errorService;
  }

  /**
   * @return {*}
   */
  getUserExtractor() {
    return this.getUserModel().extractor;
  }

  /**
   * @return {*}
   */
  getUserRepository() {
    return this.getUserModel().getRepository();
  }

  /**
   * @return {*}
   */
  getUserModel() {
    return this.modelService.get('User');
  }
}

module.exports = AuthService;

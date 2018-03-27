// auth/service/OAuthService.js

const { sign, verify } = require('jsonwebtoken');

const UserRoleEnum = require('./../../user/enum/UserRoleEnum');


class OAuthService {

  constructor(errorService, modelService, secret, options) {
    this.errorService = errorService;
    this.modelService = modelService;

    this.secret = secret;
    this.options = options;

    this.authorization = this.authorization.bind(this);
  }

  /**
   * @param user
   * @param options
   * @return {*}
   */
  generateToken(user, options = {}) {

    const extractedUser = this.getUserExtractor().extract(user);

    options = options || this.options;
    return sign(extractedUser, this.secret, options);
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

      await verify(authToken, this.secret, async (err) => {
        if (err) {
          throw this.getErrorService().createNotAuthorizedError(err.message);
        }
      });

      const accessToken = await this.getAccessTokenRepository().findAccessToken(authToken);

      if (!accessToken) {
        throw this.getErrorService().createNotAuthorizedError('Not found token');
      }

      const user = await this.getUserRepository().findById(accessToken.userId);

      if (!user) {
        throw this.getErrorService().createNotAuthorizedError('User is not found');
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
        throw this.getErrorService().createNotAuthorizedError('Refresh token is not found');
        //TODO: move condition inside AccessToken model
      case (refreshToken.expiredAt < (Date.now())):
        await this.getAccessTokenRepository().destroyById(refreshToken.id);

        throw this.getErrorService().createNotAuthorizedError('Refresh token is expired');

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

module.exports = OAuthService;

// auth/service/OAuthService.js

const { sign, verify } = require('jsonwebtoken');

const UserRoleEnum = require('./../../user/enum/UserRoleEnum');
const TokenTypeEnum = require('./../enum/TokenTypeEnum');

const AbstractController = require('./../../core/controller/AbstractController');


class OAuthService {

  /**
   * @param errorService
   * @param modelService
   * @param cryptoService
   * @param secret
   * @param options
   * @param moment
   */
  constructor(errorService, modelService, cryptoService, secret, options, moment) {
    this.errorService = errorService;
    this.modelService = modelService;
    this.cryptoService = cryptoService;

    this.secret = secret;
    this.options = options;
    this.moment = moment;

    this.authorization = this.authorization.bind(this);
  }

  /**
   * @return {Promise<string|null>}
   */
  async generateToken() {
    const token = await this.getCryptoService().getRandomString(32);

    return token || null;
  }

  /**
   * @param user
   * @param options
   * @returns {Promise<*>}
   */
  async generateUserToken(user, options = {}) {

    const extractedUser = await this.getUserExtractor().extract(user);

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

    ctx.state.role = UserRoleEnum.USER_ROLE;

    if (authorizationHeader) {

      const authToken = authorizationHeader.replace('Bearer ', '');

      await verify(authToken, this.secret, async (err) => {
        if (err) {
          throw this.getErrorService().createNotAuthorizedError(err.message);
        }
      });

      const verificationToken = await this.getVerificationTokenRepository().findAccessTokenByToken(authToken);

      if (!verificationToken) {
        throw this.getErrorService().createNotAuthorizedError('Not found token');
      }

      const user = await this.getUserRepository().find(verificationToken.userId);

      if (!user) {
        throw this.getErrorService().createNotAuthorizedError('User is not found');
      }

      ctx.state.role = user.role;
      ctx.state.user = user;
      ctx.state.token = verificationToken;
    }

    await next();
  }

  /**
   * @param user
   * @return {Promise<void>}
   */
  async cleanUserAccessTokens(user) {

    const accessTokens = await this.getVerificationTokenRepository().findUserAccessTokensByUserId(user.id);

    await AbstractController.asyncForEach(accessTokens, async (accessToken) => {
      if (accessToken.createdAt < new Date(Date.now() - 7200000000)) {
        await accessToken.destroy();
      }
    });
  }

  /**
   *
   * @param user
   * @return {Promise<*>}
   */
  async createUserAccessToken(user) {

    const accessToken = await this.getVerificationTokenRepository().create({
      userId: user.id,
      token: await this.generateUserToken(user),
      type: TokenTypeEnum.ACCESS_TOKEN_TYPE,
      expiredAt: this.generateExpiredAtDateByAmmountOfDays(100),
    });

    return accessToken || null;
  }

  /**
   *
   * @param user
   * @return {Promise<*>}
   */
  async createUserRefreshToken(user) {

    const refreshToken = await this.getVerificationTokenRepository().create({
      userId: user.id,
      token: await this.generateUserToken(user),
      type: TokenTypeEnum.REFRESH_TOKEN_TYPE,
      expiredAt: this.generateExpiredAtDateByAmmountOfDays(100),
    });

    return refreshToken || null;
  }


  /**
   * @param user
   * @returns {Promise<*|null>}
   */
  async createUserRegistrationToken(user) {

    const registrationToken =  await this.getVerificationTokenRepository().create({
      userId: user.id,
      token: await this.generateToken(),
      type: TokenTypeEnum.REGISTER_TOKEN_TYPE,
      expiredAt: this.generateExpiredAtDateByAmmountOfDays(),
    });

    return registrationToken || null;
  }

  /**
   * @param user
   * @return {Promise<*>}
   */
  async createUserForgotToken(user) {

    const forgotToken =  await this.getVerificationTokenRepository().create({
      userId: user.id,
      token: await this.generateToken(),
      type: TokenTypeEnum.FORGOT_TOKEN_TYPE,
      expiredAt: this.generateExpiredAtDateByAmmountOfDays(),
    });

    return forgotToken || null;
  }

  /**
   * @param days
   * @return {*}
   */
  generateExpiredAtDateByAmmountOfDays(days = 1) {
    return this.moment().add(days, 'days').format();
  }

  /**
   * @return {*}
   */
  getVerificationTokenRepository() {
    return this.modelService.get('VerificationToken').getRepository();
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
  getCryptoService() {
    return this.cryptoService;
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

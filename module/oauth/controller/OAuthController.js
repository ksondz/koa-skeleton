

const AbstractController = require('./../../core/controller/AbstractController');
const TokenTypeEnum = require('./../enum/TokenTypeEnum');
const UserStateEnum = require('./../../user/enum/UserStateEnum');


class OAuthController extends AbstractController {


  /**
   * @param validatorManager
   * @param modelService
   * @param errorService
   * @param oauthService
   * @param cryptoService
   * @param mailService
   */
  constructor(validatorManager, modelService, errorService, oauthService, cryptoService, mailService) {
    super(validatorManager, modelService, errorService);

    this.oauthService = oauthService;
    this.cryptoService = cryptoService;
    this.mailService = mailService;
  }
  
  
  /**
   * @return {{create: any, fetchAll: any, fetch: any, patch: any, delete: any}}
   */
  getActions() {
    return {
      oauth: this.oauthAction.bind(this),
      signUp: this.signUpAction.bind(this),
      forgotPassword: this.forgotPasswordAction.bind(this),
      updateForgotPassword: this.updateForgotPasswordAction.bind(this),
      logout: this.logoutAction.bind(this),
    };
  }


  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async oauthAction(ctx, next) {
    const typeValidatedData = await this.getValidatorManager().get('OAuthTypeValidator').validate(ctx.request.body);

    if (typeValidatedData.type === TokenTypeEnum.REFRESH_TOKEN_TYPE) {
      ctx.body = this.refreshToken(ctx.request.body);
    } else {
      ctx.body = await this.authenticate(ctx.request.body);
    }
  }

  /**
   * @param requestBody
   * @return {Promise<{accessToken, refreshToken}>}
   */
  async refreshToken(requestBody) {
    const validatedData = await this.getValidatorManager().get('OAuthRefreshTokenValidator').validate(requestBody);
    const refreshToken = await this.getVerificationTokenRepository().findRefreshTokenByToken(validatedData.token);

    if (!refreshToken) {
      throw this.getErrorService().createForbiddenError();
    }
    const user = await refreshToken.getUser();

    const result = await this.getModelService().runTransaction(async () => {

      await this.oauthService.cleanUserAccessTokens(user);
      await refreshToken.destroy();

      const userAccessToken = await this.oauthService.createUserAccessToken(user);
      const userRefreshToken = await this.oauthService.createUserRefreshToken(user);

      return {
        accessToken: await this.getVerificationTokenExtractor().extract(userAccessToken),
        refreshToken: await this.getVerificationTokenExtractor().extract(userRefreshToken),
      };
    });

    return result || {};
  }

  /**
   * @param requestBody
   * @return {Promise<{}>}
   */
  async authenticate(requestBody) {
    const validatedData = await this.getValidatorManager().get('OAuthValidator').validate(requestBody);
    const user = await this.getUserRepository().findByEmail(validatedData.username);

    const userAccessToken = await this.oauthService.createUserAccessToken(user);

    const extractedAccessToken = await this.getVerificationTokenExtractor().extract(userAccessToken);
    return extractedAccessToken || {};
  }

  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async signUpAction(ctx, next) {

    const RegistrationValidator = this.getValidatorManager().get('RegistrationValidator');

    const userData = await RegistrationValidator.validate(ctx.request.body);

    userData.state = UserStateEnum.BLOCKED_USER_STATE;

    const user = await this.getUserRepository().create(userData);

    const accessToken = await this._generateAccessToken(user.id);

    await this.sendRegisterToken(process.env.MAIL_CLIENT_LINKS_URL, user, accessToken);

    ctx.body = {
      success: true,
    };
  }


  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async forgotPasswordAction(ctx, next) {

    const ForgotPasswordValidator = this.getValidatorManager().get('ForgotPasswordValidator');

    const validateData = await ForgotPasswordValidator.validate(ctx.request.body);

    const teacher = await this.getUserRepository().findTeacherByEmail(validateData.email);

    const forgotToken = await this.cryptoService.getRandomString(32);

    await this.getUserRepository().update(teacher.id, {
      forgotToken,
    });

    await this.sendResetPasswordEmail(process.env.MAIL_CLIENT_LINKS_URL, teacher.email, forgotToken);

    ctx.body = {
      success: true,
    };
  }


  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async updateForgotPasswordAction(ctx, next) {

    const token = ctx.request.body.token.trim();

    const PasswordValidator = this.getValidatorManager().get('PasswordValidator');
    const validateData = await PasswordValidator.validate(ctx.request.body);

    const user = await this.getUserRepository().findUserByForgotToken(token);

    if (!user) {
      console.log('User with forgot token is not found.');
      throw this.getErrorService().createForbiddenError();
    }

    user.forgotToken = null;
    user.password = await this.getCryptoService().createBcryptHash(validateData.password.trim());

    user.save();

    ctx.body = {
      success: true,
    };
  }


  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async logoutAction(ctx, next) {

    const { token } = ctx.state;

    await this.getAccessTokenRepository().destroyById(token.id);

    ctx.body = {
      success: true,
    };

  }

  /**
   * @param host
   * @param email
   * @param token
   * @returns {Promise<void>}
   */
  async sendResetPasswordEmail(host, email, token) {

    const templateData = this.mailService.createForgotPasswordTemplate(host, token);

    await this.mailService.send(email, templateData.name, templateData);
  }


  /**
   * @param host
   * @param user
   * @param token
   * @return {Promise<void>}
   */
  async sendRegisterToken(host, user, token) {

    const templateData = this.mailService.createRegisterTokenTemplate(host, token, user);

    await this.mailService.send(user.email, templateData.name, templateData);
  }

  /**
   * @param userId
   * @return {Promise<string>}
   * @private
   */
  async _generateAccessToken(userId) {

    const accessToken = await this.cryptoService.getRandomString(32);

    await this.getAccessTokenRepository().create({
      userId,
      token: accessToken,
      type: TokenTypeEnum.REGISTER_TOKEN_TYPE,
      expDate: this.moment().add(1, 'days').format(),
    });

    return accessToken;
  }

  /**
   * @return {*}
   */
  getVerificationTokenRepository() {
    return this.getModelService().get('VerificationToken').getRepository();
  }

  /**
   * @return {*}
   */
  getVerificationTokenExtractor() {
    return this.getModelService().get('VerificationToken').getExtractor();
  }

  /**
   * @return {*}
   */
  getUserRepository() {
    return this.getModelService().get('User').getRepository();
  }
}

module.exports = OAuthController;

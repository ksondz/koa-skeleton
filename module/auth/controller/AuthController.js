// auth/controllers/OAuthController.js

const AbstractController = require('./../../appExtension/controller/AbstractController');
const TokenTypeEnum = require('./../enum/TokenTypeEnum');
const UserStateEnum = require('./../../user/enum/UserStateEnum');


class AuthController extends AbstractController {


  /**
   * @param modelService
   * @param validatorService
   * @param cryptoService
   * @param mailService
   * @param oauthService
   * @param moment
   */
  constructor(modelService, validatorService, cryptoService, mailService, oauthService, moment) {
    super(modelService, validatorService);

    this.cryptoService = cryptoService;
    this.mailService = mailService;
    this.oauthService = oauthService;
    this.moment = moment;
  }
  
  
  /**
   * @return {{create: any, fetchAll: any, fetch: any, patch: any, delete: any}}
   */
  getActions() {
    return {
      login: this.loginAction.bind(this),
      logout: this.logoutAction.bind(this),
      registration: this.registrationAction.bind(this),
      forgotPassword: this.forgotPasswordAction.bind(this),
      updateForgotPassword: this.updateForgotPasswordAction.bind(this),
    };
  }


  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async loginAction(ctx, next) {

    const requestParams = ctx.request.body;

    const LoginValidator = this.getValidatorService().get('LoginValidator');

    const validateData = await LoginValidator.validate(requestParams);

    const user = await this.getUserRepository().findUserByEmailOrUserName(validateData.login);

    const userTokens = await this.getAccessTokenRepository().findUserAccessTokens(user.id);
    await userTokens.forEach(async (userToken) => {
      if (userToken.createdAt < new Date(Date.now() - 7200000000)) {
        await userToken.destroy();
      }
    });

    const newAccessToken = await this.getAccessTokenRepository().create({
      userId: user.id,
      token: this.oauthService.generateToken(user),
      type: TokenTypeEnum.ACCESS_TOKEN_TYPE,
      expDate: this.moment().add(100, 'days').format(),
    });

    const userResponse = await this.getUserModel().extractor.extractWithExtraProperties(user);

    ctx.body = {
      token: newAccessToken.token,
      user: userResponse,
    };
  }


  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async registrationAction(ctx, next) {

    const RegistrationValidator = this.getValidatorService().get('RegistrationValidator');

    const userData = await RegistrationValidator.validate(ctx.request.body);

    userData.state = UserStateEnum.BLOCKED_USER_STATE;

    const user = await this.getUserRepository().create(userData);

    const accessToken = await this._generateAccessToken(user.id);

    await this.sendRegisterToken(process.env.APP_CLIENT_URL, user, accessToken);

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

    const ForgotValidator = this.getValidatorService().get('ForgotValidator');

    const validateData = await ForgotValidator.validate(ctx.request.body);

    const teacher = await this.getUserRepository().findTeacherByEmail(validateData.email);

    const forgotToken = await this.cryptoService.getRandomString(32);

    await this.getUserRepository().update(teacher.id, {
      forgotToken,
    });

    await this.sendResetPasswordEmail(process.env.APP_CLIENT_URL, teacher.email, forgotToken);

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

    const PasswordValidator = this.getValidatorService().get('PasswordValidator');
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
  getAccessTokenRepository() {
    return this.getModelService().get('AccessToken').getRepository();
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
    return this.getModelService().get('User');
  }


  getCryptoService() {
    return this.cryptoService;
  }

  /**
   * @return OAuthService
   */
  getOAuthService() {
    return this.oauthService;
  }

}

module.exports = AuthController;

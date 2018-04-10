// user/controllers/AccountController.js

const AbstractController = require('../../core/controller/AbstractController');
const UserStateEnum = require('./../../user/enum/UserStateEnum');
const UserRoleEnum = require('./../../user/enum/UserRoleEnum');
const TokenTypeEnum = require('./../../auth/enum/TokenTypeEnum');
const moment = require('moment');

class AccountController extends AbstractController {


  /**
   * @param modelService
   * @param validatorService
   * @param authService
   */
  constructor(modelService, validatorService, authService) {
    super(modelService, validatorService);

    this.authService = authService;
  }

  /**
   * @returns {{update: any, current: any}}
   */
  getActions() {
    return {
      verify: this.verifyTokenAction.bind(this),
      patch: this.patchAction.bind(this),
      fetch: this.fetchAction.bind(this),
    };
  }


  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async verifyTokenAction(ctx, next) {
    const { token } = ctx.params;

    const accessToken = await this.getAccessTokenRepository().findToken(token);

    if (!accessToken) throw this.getErrorService().createValidationError('Token not found');

    let userModel = await accessToken.getUser();

    if (userModel.state !== UserStateEnum.ACTIVE_USER_STATE) {
      userModel = await this.getUserRepository().update(userModel.id, {
        state: UserStateEnum.ACTIVE_USER_STATE,
      });
    }

    await accessToken.destroy();

    const userTokens = await this.getAccessTokenRepository().findUserAccessTokens(userModel.id);
    await userTokens.forEach(async (userToken) => {
      await userToken.destroy();
    });

    const newToken = await this.getAccessTokenRepository().create({
      userId: userModel.id,
      token: this.authService.generateToken(userModel),
      type: TokenTypeEnum.ACCESS_TOKEN_TYPE,
      expDate: moment().add(100, 'days').format(),
    });

    const userResponse = await this.getUserExtractor().extract(userModel);

    ctx.body = {
      user: userResponse,
      token: newToken.token,
    };
  }


  /**
   * @param ctx
   * @param next
   * @returns {Promise<void>}
   */
  async patchAction(ctx, next) {

    const { state } = ctx;

    const validatorName = (state.role === UserRoleEnum.TEACHER_USER_ROLE) ? 'Patch/TeacherAccountValidator' : 'Patch/StudentAccountValidator';

    const accountValidator = this.getValidatorService().get(validatorName);
    const accountPatchData = await accountValidator.validate(ctx.request.body, state.user);

    const updatedUserModel =  await this.getUserRepository().update(state.user.id, accountPatchData);

    ctx.body = await this.getUserExtractor().extract(updatedUserModel);
  }

  /**
   * @param ctx
   * @param next
   * @returns {Promise<void>}
   */
  async fetchAction(ctx, next) {

    const { state } = ctx;

    const userModel = await this.getUserRepository().findById(state.user.id);

    const userResponse = await this.getUserExtractor().extract(userModel);

    ctx.body = { user: userResponse };
  }

  /**
   * @return {DefaultExtractor}
   */
  getUserExtractor() {
    return this.getModelService().get('User').extractor;
  }

  /**
   * {*}
   */
  getUserRepository() {
    return this.getModelService().get('User').getRepository();
  }

  /**
   * @return {*}
   */
  getAccessTokenRepository() {
    return this.getModelService().get('AccessToken').getRepository();
  }
}

module.exports = AccountController;



const UserRoleEnum = require('../../user/enum/UserRoleEnum');


class RoleResolverService {

  /**
   * @param errorService
   */
  constructor(errorService) {
    this.errorService = errorService;

    this.isAuthorized = this.isAuthorized.bind(this);
    this.isAdmin = this.isAdmin.bind(this);
    this.isGuest = this.isGuest.bind(this);
  }

  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async isGuest(ctx, next) {

    const role = this.getStateRole(ctx);

    if (role === UserRoleEnum.GUEST_ROLE) {
      await next();
    }
  }

  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async isAuthorized(ctx, next) {

    const role = this.getStateRole(ctx);

    if (this.isAuthorizedRole(role)) {
      await next();
    }
  }

  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async isAdmin(ctx, next) {

    const role = this.getStateRole(ctx);

    if (this.isAuthorizedRole(role) && (role !== UserRoleEnum.ADMIN_ROLE)) {
      throw this.getErrorService().createForbiddenError();
    }

    await next();
  }

  /**
   * @param role
   * @returns {boolean}
   */
  isAuthorizedRole(role) {
    if (role === UserRoleEnum.GUEST_ROLE) {
      throw this.getErrorService().createNotAuthorizedError();
    }

    return true;
  }

  /**
   * @param ctx
   */
  getStateRole(ctx) {
    const { state } = ctx;

    if (!state && !state.role) {
      throw this.getErrorService().createServerError('State role is not defined');
    }

    return state.role;
  }

  /**
   * @return {*}
   */
  getErrorService() {
    return this.errorService;
  }
}

module.exports = RoleResolverService;

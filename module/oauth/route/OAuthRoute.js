

const BaseRoute = require('../../core/route/BaseRoute');


class OAuthRoute extends BaseRoute {


  init() {
    const baseApiPath = this.getApiPath();
    const controllerActions = this.getControllerActions('OAuthController');

    this.getRouter()
      .post(`${baseApiPath}/oauth`, controllerActions.oauth)
      .get(`${baseApiPath}/logout`, this.getRoleResolverService().isAuthorized, controllerActions.logout)
      .post(`${baseApiPath}/signup`, controllerActions.signUp)
      .post(`${baseApiPath}/forgot-password`, controllerActions.forgotPassword)
      .patch(`${baseApiPath}/forgot-password`, controllerActions.updateForgotPassword);
  }

}


module.exports = OAuthRoute;

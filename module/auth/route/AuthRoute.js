

const BaseRoute = require('../../core/route/BaseRoute');


class AuthRoute extends BaseRoute {


  init() {

    const baseApiPath = this.getApiPath();

    const authController = this.getControllerService().get('AuthController');
    const controllerActions = authController.getActions();

    this.getRouter().post(`${baseApiPath}/auth`, controllerActions.auth)
      .get(`${baseApiPath}/logout`, this.getRoleResolverService().isAuthorized, controllerActions.logout)
      .post(`${baseApiPath}/signup`, controllerActions.signUp)
      .post(`${baseApiPath}/forgot-password`, controllerActions.forgotPassword)
      .patch(`${baseApiPath}/forgot-password`, controllerActions.updateForgotPassword);
  }

}


module.exports = AuthRoute;

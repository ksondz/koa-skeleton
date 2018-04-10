// auth/route/UserRoute.js

const BaseRoute = require('../../core/route/BaseRoute');


class AuthRoute extends BaseRoute {

  init() {

    const router = this.getRouter();
    const baseApiPath = this.getApiPath();

    const authController = this.getControllerService().get('AuthController');
    const controllerActions = authController.getActions();

    router.post(`${baseApiPath}/auth`, controllerActions.auth);
    router.get(`${baseApiPath}/logout`, this.getRoleResolverService().isAuthorized, controllerActions.logout);
    router.post(`${baseApiPath}/signup`, controllerActions.signUp);
    router.post(`${baseApiPath}/forgot-password`, controllerActions.forgotPassword);
    router.patch(`${baseApiPath}/forgot-password`, controllerActions.updateForgotPassword);
  }

}


module.exports = AuthRoute;

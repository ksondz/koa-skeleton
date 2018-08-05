

const BaseRoute = require('../../core/route/BaseRoute');


class AccountRoute extends BaseRoute {


  init() {
    super.init();

    const accountPath = this.getApiPath('/account');

    const accountController = this.getControllerManager().get('AccountController');
    const controllerActions = accountController.getActions();

    this.router
      .patch(`${accountPath}`, this.getRoleResolverService().isAuthorized, controllerActions.patch)
      .get(`${accountPath}`, this.getRoleResolverService().isAuthorized, controllerActions.fetch)
      .get(`${accountPath}/verify/:token`, controllerActions.verify);
  }
}


module.exports = AccountRoute;

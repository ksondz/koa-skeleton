// user/config/controller.config.js


const AccountControllerFactory = require('./../controller/factory/AccountControllerFactory');

module.exports = {
  controllers: {
    AccountController: AccountControllerFactory,
  },
};

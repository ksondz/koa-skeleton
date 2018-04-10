// auth/config/controller.config.js

const AuthControllerFactory = require('./../controller/factory/AuthControllerFactory');


module.exports = {
  controllers: {
    AuthController: AuthControllerFactory,
  },
};

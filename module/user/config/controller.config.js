// template/config/controller.config.js


const AccountControllerFactory = require('./../controller/factory/AccountControllerFactory');
const StudentControllerFactory = require('./../controller/factory/StudentControllerFactory');

module.exports = {
  controllers: {
    AccountController: AccountControllerFactory,
    StudentController: StudentControllerFactory,
  },
};

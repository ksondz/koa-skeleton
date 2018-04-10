// auth/config/validator.config.js


const PasswordValidator = require('../validator/PasswordValidator');

const RegistrationValidatorFactory = require('../validator/factory/RegistrationValidatorFactory');
const LoginValidatorFactory = require('../validator/factory/LoginValidatorFactory');
const ForgotPasswordValidatorFactory = require('../validator/factory/ForgotPasswordValidatorFactory');
const AuthValidatorFactory = require('../validator/factory/AuthValidatorFactory');


module.exports = {
  validators: {
    PasswordValidator,

    RegistrationValidator: RegistrationValidatorFactory,
    LoginValidator: LoginValidatorFactory,
    ForgotPasswordValidator: ForgotPasswordValidatorFactory,
    AuthValidator: AuthValidatorFactory,
  },
};

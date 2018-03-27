// auth/config/validator.config.js


const PasswordValidator = require('../validator/PasswordValidator');

const RegistrationValidatorFactory = require('../validator/factory/RegistrationValidatorFactory');
const LoginValidatorFactory = require('../validator/factory/LoginValidatorFactory');
const ForgotValidatorFactory = require('../validator/factory/ForgotValidatorFactory');
const OAuthValidatorFactory = require('../validator/factory/OAuthValidatorFactory');


module.exports = {
  validators: {
    PasswordValidator,

    RegistrationValidator: RegistrationValidatorFactory,
    LoginValidator: LoginValidatorFactory,
    ForgotValidator: ForgotValidatorFactory,
    OAuthValidator: OAuthValidatorFactory,
  },
};

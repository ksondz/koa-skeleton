// appExtension/service/EnvironmentService.js

const appEnv = require('./../../../env/env');


class EnvironmentService {


  static get PRODUCTION_ENV() {
    return 'production';
  }

  static get DEVELOPMENT_ENV() {
    return 'development';
  }

  static get TEST_ENV() {
    return 'test';
  }

  static get ALLOWED_ENV_ARRAY() {
    return [
      EnvironmentService.PRODUCTION_ENV,
      EnvironmentService.DEVELOPMENT_ENV,
      EnvironmentService.TEST_ENV,
    ];
  }

  /**
   * @return {string}
   */
  static getEnvironment() {
    return process.env.APP_ENV;
  }


  /**
   * @return {string}
   */
  static defineEnvironment() {
    if (!EnvironmentService.isEnvironmentDefined()) {
      Object.assign(process.env, appEnv);

      if (EnvironmentService.ALLOWED_ENV_ARRAY.indexOf(process.env.APP_ENV) === -1) {
        process.env.APP_ENV = EnvironmentService.DEVELOPMENT_ENV;
      }
    }

    return process.env.APP_ENV;
  }

  /**
   * @return {string}
   */
  static isEnvironmentDefined() {
    return (process.env.APP_ENV);
  }

  /**
   * @return {boolean}
   */
  static isDevelopment() {
    return EnvironmentService.getEnvironment() === EnvironmentService.DEVELOPMENT_ENV;
  }

  /**
   * @return {boolean}
   */
  static isProduction() {
    return EnvironmentService.getEnvironment() === EnvironmentService.PRODUCTION_ENV;
  }

}


if (!EnvironmentService.isEnvironmentDefined()) {
  EnvironmentService.defineEnvironment();
}

module.exports = EnvironmentService;

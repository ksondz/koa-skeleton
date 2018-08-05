// config/app.config.js

const EnvironmentService = require('./../module/core/service/EnvironmentService');

/**
 * Set environment
 *
 * @type {string | undefined | string}
 */
module.exports.env = EnvironmentService.getEnvironment();

/**
 * Inject db config
 */
module.exports.db = require('./sequelize.db.config')[EnvironmentService.getEnvironment()];

/**
 * @type {{secret: string, options: {expiresIn: string}}}
 */
module.exports.jwt = {
  secret: process.env.JWT_SECRET,
  options: {
    expiresIn: process.env.JWT_EXP,
  },
};

/**
 * Configurations for koa static server.
 * You can choose root dir and root path for public application folder.
 *
 * @type {{rootDir: string, rootPath: string}}
 */
module.exports.staticServer = {
  rootDir: 'web',
  rootPath: '/web',
};

/**
 * Router params
 *
 * @type {{APP_API: string | undefined | string, PORT: string | undefined | number}}
 */
module.exports.router = {
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  baseApi: process.env.APP_API,
};

/**
 * Mail params
 *
 * @type {{transport: {options: {service: string, auth: {user: string, pass: string}}}}}
 */
module.exports.mail = {
  transport: {
    options: {
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS,  // generated ethereal password
      },
    },
  },
};

/**
 * @type {string}
 */
module.exports.modulePath = `${__dirname}/../module`;

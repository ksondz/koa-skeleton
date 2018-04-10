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
 * Set url params
 *
 * @type {{APP_API: string | undefined | string, PORT: string | undefined | number}}
 */
module.exports.router = {
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  baseApi: process.env.APP_API,
};

/**
 * @type {string}
 */
module.exports.modulePath = `${__dirname}/../module`;

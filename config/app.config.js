// config/app.config.js

if (!process.env.APP_ENV) {
  Object.assign(process.env, require('./../env/env'));
}

const env = process.env.APP_ENV || 'development';

/**
 * Set environment
 *
 * @type {string | undefined | string}
 */
module.exports.env = env;


/**
 * Inject db config
 */
module.exports.db = require('./db.config')[env];


/**
 * AWS S3 credentials
 *
 * @type {{S3: {accessKeyId: string, secretAccessKey: string, region: string}}}
 */
module.exports.aws = {
  S3: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    Bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION,
    url: process.env.S3_URL,
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

module.exports.headLess = {
  port: process.env.HEADLESS_PORT,
};

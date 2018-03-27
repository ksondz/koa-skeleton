// config/sequelize.db.config.js

const EnvironmentService = require('./../module/appExtension/service/EnvironmentService');

const dbConfig = {};

EnvironmentService.ALLOWED_ENV_ARRAY.forEach((environment) => {
  dbConfig[environment] = {
    username: process.env.DB_PG_USER,
    password: process.env.DB_PG_PASS,
    database: process.env.DB_PG_DATABASE,
    host: process.env.DB_PG_HOSTNAME,
    port: process.env.DB_PG_PORT,
    dialect: 'postgres',
  }
});

module.exports = dbConfig;

// config/sequelize.db.config.js

const EnvironmentService = require('./../module/core/service/EnvironmentService');

const dbConfig = {};

EnvironmentService.ALL_ENVIRONMENTS.forEach((environment) => {
  dbConfig[environment] = {
    username: process.env.DB_PG_USER,
    password: process.env.DB_PG_PASS,
    database: process.env.DB_PG_DATABASE,
    host: process.env.DB_PG_HOSTNAME,
    port: process.env.DB_PG_PORT,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    logging: false,
  };
});

module.exports = dbConfig;

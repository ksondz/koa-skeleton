
// Please create new env.js file for your local environment

module.exports = {

  APP_ENV: 'development',
  APP_HOST: 'http://localhost',
  APP_PORT: 8001,
  APP_API: 'api/v1',

  DB_PG_DATABASE: 'koa_app_db',
  DB_PG_USER: 'koa_app_user',
  DB_PG_PASS: 'koa_app_pass',
  DB_PG_PORT: 5433,
  DB_PG_HOSTNAME: '127.0.0.1',

  // Your email address and password
  MAIL_USER: 'your.email.adress@gmail.com',
  MAIL_PASS: '1qaZXssW2',

  JWT_SECRET: 'json_web_token_secret_key',
  JWT_EXP: '1h',
};

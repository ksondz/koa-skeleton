
module.exports = {

  APP_ENV: 'development',
  APP_HOST: 'http://localhost',
  APP_PORT: 8001,
  APP_API: 'api/v1',

  DB_PG_DATABASE: 'koa_app_db',
  DB_PG_USER: 'koa_app_user',
  DB_PG_PASS: 'koa_app_pass',
  DB_PG_PORT: 5432,
  DB_PG_HOSTNAME: '127.0.0.1',

  // Setting for JWT token. You can set jwt secret and an amount of hours for jwt expired time
  JWT_SECRET: 'this_is_secret_key_for_json_web_token_any_number_1122',
  JWT_EXP: '1h',

  // Your email address and password
  MAIL_USER: 'your.email.adress@gmail.com',
  MAIL_PASS: '1qaZXssW2',
  // This link should have host value where links will redirect recipients.
  MAIL_CLIENT_LINKS_URL: 'http://localhost',

  // AWS S3 configurations
  S3_BUCKET: 'koaappdev',
  S3_REGION: 'eu-west-3',
  S3_ACCESS_KEY_ID: 'ADWDSWQEGSSADD',
  S3_SECRET_ACCESS_KEY: 'FOWdwQoAWC/gqixLfeLdswz09gWTUWUBtm1xDaaw',
  S3_URL: 'https://s3.eu-west-3.amazonaws.com/koaappdev/'
};


module.exports = {
  APP_ENV: 'development',
  APP_HOST: 'http://localhost',
  APP_PORT: 8001,
  APP_API: 'api/v1',
  APP_CLIENT_URL: 'http://localhost',

  DB_PG_DATABASE: 'publisher',
  DB_PG_USER: 'postgres',
  DB_PG_PASS: '',
  DB_PG_PORT: 5432,
  DB_PG_HOSTNAME: '127.0.0.1',

  JWT_SECRET: 'this_is_secret_key_for_jsonwebtoken_123456789',
  JWT_EXP: '1h',

  MAIL_USER: 'testmspublisher@gmail.com',
  MAIL_PASS: '1qaZXsw2',

  S3_BUCKET: 'mspdev',
  S3_REGION: 'eu-west-3',
  S3_ACCESS_KEY_ID: 'AKIAI5XALRDJ5CH5SNCQ',
  S3_SECRET_ACCESS_KEY: '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',
  S3_URL: 'https://s3.eu-west-3.amazonaws.com/msp-develop/',

  HEADLESS_PORT: 9222,
};

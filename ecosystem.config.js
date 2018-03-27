
const appEnv = require('./env/env');

let pm2Name = 'msp-prod';

if (appEnv.APP_ENV !== 'production') {

  pm2Name = 'msp-dev';
}

module.exports = {
  apps: [
    {
      name: pm2Name,
      script: './index.js',
      args: [
        '--toto=heya coco',
        '-d',
        '1',
      ],
      watch: true,
      ignore_watch: [
        'node_modules',
        'logs',
        '.git',
        '.idea',
      ],
      node_args: '',
      merge_logs: true,
      cwd: './',
      env: appEnv,
    },
  ],
};

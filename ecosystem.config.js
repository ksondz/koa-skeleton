
const EnvironmentService = require('./module/appExtension/service/EnvironmentService');

const pm2Name = EnvironmentService.isProduction() ? 'koa-app-prod' : 'koa-app-dev';

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
      env: EnvironmentService.getEnvironment(),
    },
  ],
};

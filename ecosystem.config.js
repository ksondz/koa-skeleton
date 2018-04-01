
const EnvironmentService = require('./module/skeletonExtension/service/EnvironmentService');

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
      node_args: '',
      merge_logs: true,
      cwd: './',
    },
  ],
};

// server/index.js


const Koa = require('koa');

const config = require('./config/app.config');

const AppExtension = require('./module/skeletonExtension/AppExtension');

const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const staticServer = require('koa-static-server');


(async () => {

  const app = new Koa();

  const appExtension = new AppExtension(app, config);

  await appExtension.loadModules();

  const ServiceManager = appExtension.getServiceManager();

  /** @var ModelService */
  const ModelService = ServiceManager.get('ModelService');
  await ModelService.getSequelize().sync();

  /** @var ErrorService */
  const ErrorService = ServiceManager.get('ErrorService');

  /** @var OAuthService */
  const OAuthService = ServiceManager.get('OAuthService');

  /** @var RouterService */
  const RouterService = ServiceManager.get('RouterService');

  app
  // Top middleware is the error handler.
    .use(ErrorService.handle)

    .use(cors({ methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'] }))
    .use(bodyParser({ multipart: true, strict: true }))
    .use(OAuthService.authorization);

  await RouterService.initRoutes();

  app
    .use(RouterService.getRouter().routes())
    .use(staticServer(config.staticServer));

  await app.listen(config.router.port);

  console.log(`API is up on port ${config.router.port}`);

})();

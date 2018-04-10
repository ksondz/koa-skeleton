// server/index.js


const Koa = require('koa');

const config = require('./config/app.config');

const Application = require('./lib/Application');

const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const staticServer = require('koa-static-server');


(async () => {

  const app = new Koa();

  const application = new Application(app, config);
  await application.loadModules();

  /** @var ServiceManager */
  const ServiceManager = application.getServiceManager();

  /** @var ModelService */
  const ModelService = ServiceManager.get('ModelService');
  await ModelService.getSequelize().sync();

  /** @var ErrorService */
  const ErrorService = ServiceManager.get('ErrorService');

  /** @var AuthService */
  const AuthService = ServiceManager.get('AuthService');

  /** @var RouterService */
  const RouterService = ServiceManager.get('RouterService');

  app
  // Top middleware is the error handler.
    .use(ErrorService.handleError)

    .use(cors({ methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'] }))
    .use(bodyParser({ multipart: true, strict: true }))
    .use(AuthService.authorization);

  await RouterService.initRoutes();

  app
    .use(RouterService.getRouter().routes())
    .use(staticServer(config.staticServer));

  await app.listen(config.router.port);

  console.log(`API is up on port ${config.router.port}`);

})();

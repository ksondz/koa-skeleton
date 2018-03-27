// server/index.js


const Koa = require('koa');

const appConfig = require('./config/app.config');

const AppExtension = require('./module/appExtension/AppExtension');

const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const staticServer = require('koa-static-server');


(async () => {

  const app = new Koa();

  const appExtension = new AppExtension(app, appConfig);

  await appExtension.loadModules();

  const ServiceManager = appExtension.getServiceManager();

  const ModelService = ServiceManager.get('ModelService');
  const ErrorService = ServiceManager.get('ErrorService');
  const RouterService = ServiceManager.get('RouterService');
  const OAuthService = ServiceManager.get('OAuthService');

  await ModelService.getSequelize().sync();

  app.use(cors({
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
  }));

  app.use(bodyParser({
    multipart: true,
    strict: true,
  }));

  app.use(ErrorService.handle);

  app.use(OAuthService.authorization);

  await RouterService.initRoutes();
  app.use(RouterService.getRouter().routes());

  app.use(staticServer(appConfig.staticServer));

  await appExtension.listen();
  console.log(`Publisher API is up and running on port ${appExtension.getAppPort()}`);

})();

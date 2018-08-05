

const Application = require('./module/Application');

const app = new Application();

(async () => {

  await app.init();

  await app.listen(app.getConfig().router.port);

  console.log(`API is up on port ${app.getConfig().router.port}`);

})();

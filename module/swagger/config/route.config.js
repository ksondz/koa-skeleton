// swagger/config/route.config.js


// routes
const SwaggerRouteFactory = require('./../route/factory/SwaggerRouteFactory');

module.exports = {
  router: {
    routes: {
      SwaggerRoute: SwaggerRouteFactory,
    },
  },
};

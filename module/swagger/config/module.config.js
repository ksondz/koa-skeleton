// swagger/config/module.config.js


module.exports = {
  swagger: {
    getSwaggerConfig: (host, port) => {
      return {
        title: 'swagger', // page title
        oauthOptions: {}, // passed to initOAuth
        swaggerOptions: { // passed to SwaggerUi()
          url: `${host}:${port}/web/swagger.json`, // link to swagger.json
          supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
          docExpansion: 'none',
          jsonEditor: false,
          defaultModelRendering: 'schema',
          showRequestHeaders: false,
          swaggerVersion: 'x.x.x', // read from package.json,

        },
        routePrefix: false, // route where the view is returned
        hideTopbar: true, // hide swagger top bar
      };
    },
  },
};

// core/config/controller.config.js

const RestControllerFactory = require('./../controller/factory/RestControllerFactory');


module.exports = {
  controllers: {
    RestController: RestControllerFactory,
  },
};

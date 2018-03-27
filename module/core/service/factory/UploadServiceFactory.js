// core/validator/factory/UploadServiceFactory.js


const provider = require('koa-multer');
const mime = require('mime');

const FactoryInterface = require('../../../appExtension/factory/FactoryInterface');

const UploadService = require('./../UploadService');


class UploadServiceFactory extends FactoryInterface {


  /**
   * @param app
   * @return {UploadService}
   */
  constructor(app) {

    super(app);

    const errorService = this.getServiceManager().get('ErrorService');

    const types = ['jpeg', 'png', 'bmp', 'gif', 'svg'];

    const uploadService = new UploadService(errorService, provider, mime, types);

    app.use(uploadService.handleError);

    return uploadService;
  }
}

module.exports = UploadServiceFactory;

// core/config/service.config.js

const MailServiceFactory = require('./../service/factory/MailServiceFactory');
const AwsServiceFactory = require('./../service/factory/AwsServiceFactory');
const UploadServiceFactory = require('./../service/factory/UploadServiceFactory');


module.exports = {
  service_manager: {
    services: {
      MailService: MailServiceFactory,
      AwsService: AwsServiceFactory,
      UploadService: UploadServiceFactory,
    },
  },
};

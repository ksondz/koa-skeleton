// core/validator/factory/AwsServiceFactory.js

const { S3 } = require('aws-sdk');

const FactoryInterface = require('../../../appExtension/factory/FactoryInterface');

const AwsService = require('./../AwsService');


class AwsServiceFactory extends FactoryInterface {


  /**
   * @param app
   * @return {AwsService}
   */
  constructor(app) {

    super(app);

    const s3Config = this.getAppConfig().aws.S3;
    
    const options = {
      accessKeyId: s3Config.accessKeyId,
      secretAccessKey: s3Config.secretAccessKey,
      region: s3Config.region,
    };

    return new AwsService(S3, options, s3Config.url, s3Config.Bucket);
  }
}

module.exports = AwsServiceFactory;

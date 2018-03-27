// core/manager/ServiceManager.js

class AwsService {


  /**
   * @param S3
   * @param options
   * @param url
   * @param bucket
   */
  constructor(S3, options, url, bucket) {

    this.S3 = S3;
    this.options = options;
    this.baseImageUrl = url;
    this.bucket = bucket;
  }


  /**
   * @param file
   * @return {Promise<any>}
   */
  upload(file) {
    return new Promise((resolve, reject) => {

      const params = {
        Bucket: this.getBucket(),
        Key: file.name,
        Body: file.body,
        ContentType: file.contentType,
      };

      this.getAwsS3Service().putObject(params, (err, data) => {
        return err ? reject(err) : resolve(data);
      }).send();

    });
  }


  /**
   * @param file
   * @return {Promise<any>}
   */
  deleteFile(file) {
    return new Promise((resolve, reject) => {

      const params = {
        Bucket: this.getBucket(),
        Key: file.name,
      };

      this.getAwsS3Service().deleteObject(params, (err, data) => {
        return err ? reject(err) : resolve(data);
      }).send();

    });
  }


  /**
   * @param file
   * @return {Promise<any>}
   */
  readFile(file) {

    return new Promise((resolve, reject) => {

      const params = {
        Bucket: this.getBucket(),
        Key: file.name,
      };

      this.getAwsS3Service().getObject(params, (err, data) => {
        return err ? reject(err) : resolve(data);
      }).send();

    });
  }


  /**
   * @return {AwsService.S3|*}
   */
  getAwsS3Service() {
    if (!this.awsS3Service) {
      this.awsS3Service = this.awsS3Connect();
    }

    return this.awsS3Service;
  }


  /**
   * @return {AwsService.S3}
   */
  awsS3Connect() {
    const { S3 } = this;

    return new S3(this.options);
  }


  /**
   * @param path
   * @return {string}
   */
  generateImageFullPath(path) {
    return `${this.baseImageUrl}${path}`;
  }


  /**
   * @return {*}
   */
  getBucket() {
    return this.bucket;
  }

}

module.exports = AwsService;


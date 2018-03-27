// core/service/UploadService.js

class UploadService {


  /**
   * @param errorService
   * @param provider
   * @param mime
   * @param types
   */
  constructor(errorService, provider, mime, types) {
    this.errorService = errorService;
    this.provider = provider;
    this.mime = mime;
    this.types = types;

    this.handleError = this.handleError.bind(this);
  }

  /**
   * @param ctx
   * @param next
   * @return {Promise<void>}
   */
  async handleError(ctx, next) {

    try {
      await next();
    } catch (err) {

      switch (true) {
        case (err.code && (err.code === 'LIMIT_UNEXPECTED_FILE')):
          throw this.getErrorService().createValidationError(`Unexpected field '${err.field}'`);
        default:
          throw err;
      }
    }
  }


  /**
   * @param arrayName
   * @return {*|{type}|{
   *    base, includes, includesSingle, includesOne, includesOneSingle, includesRequiredUnknowns, includesRequiredKnowns,
   *    includesRequiredBoth, excludes, excludesSingle, min, max, length, ordered, orderedLength, ref, sparse, unique
   * }}
   */
  uploadArray(arrayName) {
    return this.initProvider().array(arrayName);
  }


  /**
   * @param fileName
   * @return {*|{quote, alternateQuote, description}}
   */
  uploadSingle(fileName) {
    return this.initProvider().single(fileName);
  }


  /**
   * @return {*}
   */
  initProvider() {
    return this.provider({ storage: this.provider.memoryStorage() });
  }


  /**
   * @return ErrorService
   */
  getErrorService() {
    return this.errorService;
  }


  /**
   * @return {*}
   */
  getMime() {
    return this.mime;
  }


  /**
   * @return {*}
   */
  getTypes() {
    return this.types;
  }
}

module.exports = UploadService;


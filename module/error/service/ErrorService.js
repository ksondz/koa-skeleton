

const BaseResponse = require('./../response/BaseResponse');

const BadRequestResponse = require('./../response/BadRequestResponse');
const ForbiddenResponse = require('./../response/ForbiddenResponse');
const MethodNotAllowedResponse = require('./../response/MethodNotAllowedResponse');
const NotAuthorizedResponse = require('./../response/NotAuthorizedResponse');
const NotFoundResponse = require('./../response/NotFoundResponse');
const ServerResponse = require('./../response/ServerResponse');
const ValidationResponse = require('./../response/ValidationResponse');


class ErrorService {


  constructor() {

    this.defaultServerErrorMessage = 'Internal server error';

    this.status = {
      badRequest: BaseResponse.BAD_REQUEST_STATUS,
      forbidden: BaseResponse.FORBIDDEN_STATUS,
      methodNotAllowed: BaseResponse.METHOD_NOT_ALLOWED_STATUS,
      unauthorized: BaseResponse.UNAUTHORIZED_STATUS,
      notFound: BaseResponse.NOT_FOUND_STATUS,
      validation: BaseResponse.VALIDATION_STATUS,
    };

    /**
     * @type {Promise<void>}
     */
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
        case (err instanceof ValidationResponse):
        case (err instanceof NotAuthorizedResponse):
        case (err instanceof ForbiddenResponse):
        case (err instanceof BadRequestResponse):
        case (err instanceof MethodNotAllowedResponse):
        case (err instanceof ServerResponse):
          ctx.status = err.getStatus();
          ctx.body = err.getMessage();
          break;
        default:
          ctx.status = BaseResponse.SERVER_STATUS;
          ctx.body = {
            message: err.message || this.defaultServerErrorMessage,
          };

          ctx.throw(ctx.status, ctx.body);
          break;
      }

    }
  }


  /**
   * @param message
   * @param status
   * @return {*}
   * @private
   */
  _createErrorResponse(message, status) {

    message = { message };

    switch (status) {
      case (this.status.badRequest):
        return new BadRequestResponse(message);
      case (this.status.forbidden):
        return new ForbiddenResponse(message);
      case (this.status.methodNotAllowed):
        return new MethodNotAllowedResponse(message);
      case (this.status.unauthorized):
        return new NotAuthorizedResponse(message);
      case (this.status.notFound):
        return new NotFoundResponse(message);
      case (this.status.validation):
        return new ValidationResponse(message);
      default:
        return new ServerResponse(message);
    }
  }


  /**
   * @param message
   * @return {ServerResponse}
   */
  createServerError(message) {
    return this._createErrorResponse(message);
  }

  /**
   * @param message
   * @return {ValidationResponse}
   */
  createValidationError(message) {
    return this._createErrorResponse(message, this.status.validation);
  }

  /**
   * @param message
   * @returns {NotAuthorizedResponse}
   */
  createNotAuthorizedError(message) {
    return this._createErrorResponse(message, this.status.unauthorized);
  }

  /**
   * @param message
   * @returns {ForbiddenResponse}
   */
  createForbiddenError(message) {
    return this._createErrorResponse(message, this.status.forbidden);
  }
}

module.exports = ErrorService;

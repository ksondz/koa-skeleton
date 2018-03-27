// error/service/ErrorService.js

const BaseError = require('../type/BaseError');

const ServerError = require('../type/ServerError');
const BadRequestError = require('../type/BadRequestError');
const ForbiddenError = require('../type/ForbiddenError');
const MethodNotAllowedError = require('../type/MethodNotAllowedError');
const NotAuthorizedError = require('../type/NotAuthorizedError');
const NotFoundError = require('../type/NotFoundError');
const ValidationError = require('../type/ValidationError');


class ErrorService {


  /**
   * @param app
   */
  constructor(app) {
    this.app = app;
    this.status = {
      badRequest: BaseError.BAD_REQUEST_STATUS,
      forbidden: BaseError.FORBIDDEN_STATUS,
      methodNotAllowed: BaseError.METHOD_NOT_ALLOWED_STATUS,
      unauthorized: BaseError.UNAUTHORIZED_STATUS,
      notFound: BaseError.NOT_FOUND_STATUS,
      validation: BaseError.VALIDATION_STATUS,
    };

    /**
     * @type {any}
     */
    this.handle = this.handleError.bind(this);
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
        case (err instanceof ValidationError):
        case (err instanceof NotAuthorizedError):
        case (err instanceof ForbiddenError):
        case (err instanceof BadRequestError):
        case (err instanceof MethodNotAllowedError):
        case (err instanceof ServerError):
          ctx.status = err.getStatus();
          ctx.body = err.getMessage();
          break;
        default:
          ctx.status = BaseError.SERVER_STATUS;
          ctx.body = {
            message: err.message || 'Internal server error',
          };

          this.app.emit('error', err, ctx);

          break;
      }

    }
  }

  /**
   * @param message
   * @param status
   * @return {*}
   */
  createError(message, status) {

    message = { message };

    switch (status) {
      case (this.status.badRequest):
        return new BadRequestError(message);
      case (this.status.forbidden):
        return new ForbiddenError(message);
      case (this.status.methodNotAllowed):
        return new MethodNotAllowedError(message);
      case (this.status.unauthorized):
        return new NotAuthorizedError(message);
      case (this.status.notFound):
        return new NotFoundError(message);
      case (this.status.validation):
        return new ValidationError(message);
      default:
        return new ServerError(message);
    }
  }


  /**
   * @param message
   * @returns {*}
   */
  createServerError(message) {
    return this.createError(message);
  }

  /**
   * @param message
   * @return {ValidationError}
   */
  createValidationError(message) {
    return this.createError(message, this.status.validation);
  }

  /**
   * @param message
   * @returns {NotAuthorizedError}
   */
  createNotAuthorizedError(message) {
    return this.createError(message, this.status.unauthorized);
  }

  /**
   * @param message
   * @returns {NotAuthorizedError}
   */
  createForbiddenError(message) {
    return this.createError(message, this.status.forbidden);
  }
}

module.exports = ErrorService;

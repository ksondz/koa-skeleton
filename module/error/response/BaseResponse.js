

class BaseResponse extends Error {

  /**
   * @returns {number}
   * @constructor
   */
  static get SERVER_STATUS() {
    return 500;
  }

  /**
   * @returns {number}
   * @constructor
   */
  static get BAD_REQUEST_STATUS() {
    return 400;
  }

  /**
   * @returns {number}
   * @constructor
   */
  static get UNAUTHORIZED_STATUS() {
    return 401;
  }

  /**
   * @returns {number}
   * @constructor
   */
  static get FORBIDDEN_STATUS() {
    return 403;
  }

  /**
   * @returns {number}
   * @constructor
   */
  static get NOT_FOUND_STATUS() {
    return 404;
  }

  /**
   * @returns {number}
   * @constructor
   */
  static get METHOD_NOT_ALLOWED_STATUS() {
    return 405;
  }

  /**
   * @returns {number}
   * @constructor
   */
  static get VALIDATION_STATUS() {
    return 422;
  }

  /**
   * @returns {{"500": string, "400": string, "401": string, "403": string, "404": string, "405": string, "422": string}}
   * @constructor
   */
  static get REASON_PHRASES() {
    return {
      500: 'Internal Server Error',
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      422: 'Unprocessable Entity',
    };
  }


  /**
   * @param status
   * @param message
   */
  constructor(status, message) {
    super();

    this.status = status;

    if (message) {
      this.message = message;
    }
  }

  /**
   * @return {*}
   */
  getStatus() {
    return this.status;
  }

  /**
   * @return {string}
   */
  getMessage() {
    return this.message;
  }
}

module.exports = BaseResponse;

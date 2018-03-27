// auth/service/CryptoService.js


class CryptoService {

  constructor(errorService, bcrypt, crypto, saltRounds, encoding) {
    this.errorService = errorService;
    this.bcrypt = bcrypt;
    this.crypto = crypto;
    this.saltRounds = saltRounds;
    this.encoding = encoding;
  }


  /**
   * @param value
   * @returns {Promise<*|null>}
   */
  async createBcryptHash(value) {
    if (!value) {
      throw this.getErrorService().createServerError('encode value is not provided');
    }

    const result = await this.bcrypt.hash(value, this.saltRounds);

    return result || null;
  }

  /**
   * @param check
   * @param hash
   * @return {Promise<*>}
   */
  async verifyHash(check, hash) {
    const result =  await this.bcrypt.compare(check, hash);

    return result || false;
  }

  /**
   * @param bytes
   * @return {Promise<string>}
   */
  async getRandomString(bytes) {
    return this.crypto.randomBytes(bytes).toString(this.encoding);
  }

  /**
   * @return ErrorService
   */
  getErrorService() {
    return this.errorService;
  }
}

module.exports = CryptoService;

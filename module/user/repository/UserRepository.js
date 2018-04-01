
const BaseRepository = require('../../skeletonExtension/repository/BaseRepository');


class UserRepository extends BaseRepository {


  /**
   * @param email
   * @returns {Promise<*|null>}
   */
  async findByEmail(email) {
    const result = await super.findOne({
      where: {
        email,
      },
    });

    return result || null;
  }
}

module.exports = UserRepository;

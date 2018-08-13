

const { Op } = require('sequelize');

class BaseRepository {


  /**
   * @param queryParams
   * @param limit
   * @returns {{page: number, limit: number}}
   */
  static makePaginationParams(queryParams, limit = 10) {
    const params = {
      page: parseInt(queryParams.page, 10) || 1,
      limit: parseInt(queryParams.limit, 10) || limit,
    };

    params.offset = (params.page * params.limit) - params.limit;

    return params;
  }


  /**
   * @param model
   */
  constructor(model) {
    this.model = model;
  }


  /**
   * @param data
   * @returns {Promise<*|null>}
   */
  async create(data) {
    const result = await this.getModel().create(data);

    if (!result) {
      throw new Error('Model resource was not created');
    }

    return result;
  }

  /**
   * @param data
   * @returns {Promise<*|null>}
   */
  async findAll(data) {
    const result = await this.getModel().findAll(data);

    return result || [];
  }

  /**
   * @param id
   * @returns {Promise<Model|null>}
   */
  async find(id) {
    const result = await this.getModel().findById(id);

    return result || null;
  }

  /**
   * @param data
   * @returns {Promise<*|null>}
   */
  async findOne(data) {
    const model = this.getModel();
    const result = await model.findOne(data);

    return result || null;
  }

  /**
   * @param id
   * @param data
   * @returns {Promise<{}|*>}
   */
  async update(id, data) {
    let resource = await this.find(id);

    resource = await resource.update(data);

    return resource || null;
  }

  /**
   * @return {*}
   */
  getModel() {
    return this.model;
  }

  /**
   * @param data
   * @return {Promise<*|null>}
   */
  async destroy(data) {
    const model = this.getModel();
    const result = await model.destroy(data);

    return result || null;
  }

  /**
   * @param id
   * @return {Promise<*|null>}
   */
  async destroyById(id) {
    const result = await this.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });

    return result || null;
  }

  /**
   * @param params
   * @param queryParams
   * @return {Promise<*>}
   */
  async findPaginationCollection(params, queryParams) {

    const paginationParams = BaseRepository.makePaginationParams(queryParams);

    params.limit = paginationParams.limit;
    params.offset = paginationParams.offset;

    const result = await this.getModel().findAndCountAll(params);

    return {
      page: paginationParams.page,
      limit: paginationParams.limit,
      countPages: Math.ceil(result.count / paginationParams.limit),
      count: result.count,
      rows: result.rows,
    };
  }
}

module.exports = BaseRepository;

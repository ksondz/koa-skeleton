// appExtension/repository/BaseRepository.js


class BaseRepository {

  constructor(model) {
    this.model = model;
  }


  /**
   * @param data
   * @returns {Promise<*|null>}
   */
  async create(data) {
    const result = await this.__getModel().create(data);

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
    const result = await this.__getModel().findAll(data);

    return result || [];
  }


  /**
   * @param data
   * @returns {Promise<Model|null>}
   */
  async find(data) {
    const result = await this.__getModel().find(data);

    return result || null;
  }


  /**
   * @param id
   * @returns {Promise<Model|null>}
   */
  async findById(id) {
    const result = await this.__getModel().findById(id);

    return result || null;
  }


  /**
   * @param data
   * @returns {Promise<*|null>}
   */
  async findOne(data) {
    const model = this.__getModel();
    const result = await model.findOne(data);

    return result || null;
  }


  /**
   * @param id
   * @param data
   * @returns {Promise<{}|*>}
   */
  async update(id, data) {
    let resource = await this.findById(id);

    resource = await resource.update(data);

    return resource || null;
  }

  __getModel() {
    return this.model;
  }


  async destroy(data) {
    const model = this.__getModel();
    const result = await model.destroy(data);

    return result || null;
  }


  async destroyById(id) {
    const result = await this.destroy({ where: { id } });

    return result || null;
  }

}

module.exports = BaseRepository;

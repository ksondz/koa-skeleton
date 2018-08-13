

const BaseRepository = require('./../repository/BaseRepository');
const DefaultExtractor = require('./../extractor/DefaultExtractor');


class ModelService {


  /**
   * @param models
   * @param sequelize
   */
  constructor(models, sequelize) {

    this.models = models;
    this.sequelize = sequelize;

    this.initModelsRepositories();
    this.initModelsExtractors();
    this.initModelsAssociations();
  }

  /**
   * @param name
   * @return {*}
   */
  get(name) {
    if (!this.models[name]) {
      return new TypeError(`Model with name ${name} does not exist`);
    }

    return this.models[name];
  }

  /**
   * @private
   */
  initModelsRepositories() {

    Object.keys(this.models).forEach((modelName) => {
      const model = this.get(modelName);

      const ModelRepository = model.repository;
      const repositoryInstance = ModelRepository ? new ModelRepository(model) : new BaseRepository(model);

      model.getRepository = () => {
        return repositoryInstance;
      };
    });
  }

  /**
   * @private
   */
  initModelsExtractors() {

    Object.keys(this.models).forEach((modelName) => {
      const model = this.get(modelName);

      const ModelExtractor = model.extractor;
      model.extractor = ModelExtractor ? new ModelExtractor(model) : new DefaultExtractor(model);

      model.getExtractor = () => {
        return model.extractor;
      };
    });
  }

  /**
   * @private
   */
  initModelsAssociations() {

    Object.keys(this.models).forEach((modelName) => {
      const model = this.get(modelName);

      if (Object.prototype.hasOwnProperty.call(model.options, 'associate')) {
        model.options.associate(this.models);
      }
    });
  }

  /**
   * @param execute
   * @return {Promise<*>}
   */
  async runTransaction(execute) {
    const transaction = await this.sequelize.transaction();

    try {
      const result = await execute();

      await transaction.commit();

      return result;

    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  /**
   * @return {*}
   */
  getSequelize() {
    return this.sequelize;
  }
}

module.exports = ModelService;

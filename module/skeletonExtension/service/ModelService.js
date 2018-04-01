// appExtension/service/ModelService.js

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
  }


  /**
   * @param name
   * @return {*}
   */
  get(name) {
    if (!this.getModels()[name]) {
      return new TypeError(`Model with name ${name} does not exist`);
    }

    return this.getModels()[name];
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

      if (Object.prototype.hasOwnProperty.call(model.options, 'associate')) {
        model.options.associate(this.models);
      }
    });
  }


  /**
   * @return {*}
   */
  getSequelize() {
    return this.sequelize;
  }


  /**
   * @return {{}|*|Array}
   */
  getModels() {
    return this.models;
  }


  /**
   * @param modelClass
   * @return {Request<CodeCommit.GetRepositoryOutput, AWSError>}
   */
  getModelRepository(modelClass) {

    const model = this.get(modelClass);

    return model.getRepository();
  }
}

module.exports = ModelService;



const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const FactoryInterface = require('./../../factory/FactoryInterface');
const Application = require('./../../../Application');

const ModelService = require('./../ModelService');


class ModelServiceFactory extends FactoryInterface {


  /**
   * @param serviceManager
   * @return {ModelService}
   */
  constructor(serviceManager) {

    super(serviceManager);

    const models = this.getModels();
    const sequelize = this.getSequelize();

    return new ModelService(models, sequelize);
  }


  /**
   * @return {{}}
   */
  getModels() {

    const models = {};

    const sequelize = this.getSequelize();

    fs.readdirSync(Application.MODULE_PATH)
      .filter(moduleName => (moduleName.indexOf('.') !== 0))
      .forEach((moduleName) => {
        const modelPath = `${Application.MODULE_PATH}/${moduleName}/model`;

        if (fs.existsSync(modelPath)) {

          fs.readdirSync(modelPath)
            .filter(modelName => (((modelName.indexOf('.') !== 0) && (modelName.slice(-3) === '.js'))))
            .forEach((modelName) => {
              const model = sequelize.import(path.join(modelPath, modelName));
              models[model.name] = model;
            });
        }
      });

    return models;
  }


  /**
   * @return {Sequelize}
   */
  getSequelize() {
    if (!this.sequelize) {
      const dbConfig = this.getDBConfig();
      this.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
    }

    return this.sequelize;
  }

  /**
   * @return {*}
   */
  getDBConfig() {
    return this.getConfig().db;
  }

}

module.exports = ModelServiceFactory;

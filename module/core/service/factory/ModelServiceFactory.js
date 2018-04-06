// core/service/factory/ModelServiceFactory.js

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const FactoryInterface = require('./../../factory/FactoryInterface');

const ModelService = require('./../ModelService');


class ModelServiceFactory extends FactoryInterface {


  /**
   * @param app
   * @return {ModelService}
   */
  constructor(app) {

    super(app);

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

    const moduleFolderPath = this.getAppConfig().modulePath;

    fs.readdirSync(this.getAppConfig().modulePath).filter(file => ((file.indexOf('.') !== 0))).forEach((moduleName) => {

      const modelPath = `${moduleFolderPath}/${moduleName}/model`;

      if (fs.existsSync(modelPath)) {

        const modelFiles = fs.readdirSync(modelPath).filter(file => (
          (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
        ));

        modelFiles.forEach((file) => {

          const model = sequelize.import(path.join(modelPath, file));

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
      this.sequelize = new Sequelize(this.getDBConfig().database, this.getDBConfig().username, this.getDBConfig().password, this.getDBConfig());
    }

    return this.sequelize;
  }

  /**
   * @return {*}
   */
  getDBConfig() {
    return this.getAppConfig().db;
  }

}

module.exports = ModelServiceFactory;

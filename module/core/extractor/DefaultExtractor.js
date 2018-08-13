

const _ = require('lodash');
const AbstractController = require('./../../core/controller/AbstractController');


class DefaultExtractor {


  /**
   * @param model
   * @param extractUndefinedProperties
   */
  constructor(model, extractUndefinedProperties = true) {
    this.model = model;

    this.extractUndefinedProperties = extractUndefinedProperties;
    this.defaultUndefinedPropertyValue = null;
  }


  /**
   * @return {*}
   */
  getExtractProperties() {
    let { extractProperties } = this.model;

    if (!extractProperties) {
      extractProperties = Object.keys(this.model.attribute);
    }

    return extractProperties;
  }

  /**
   * @param collection
   * @param properties
   * @param associations
   * @returns {Promise<Array>}
   */
  async extractPaginationCollection(collection, properties = [], associations = []) {
    collection.rows = await this.extractArray(collection.rows, properties, associations);

    return collection;
  }

  /**
   * @param items
   * @param properties
   * @param associations
   * @returns {Promise<Array>}
   */
  async extractArray(items, properties = [], associations = []) {
    const extractedData = [];

    items = items || [];

    if (!properties.length) {
      properties = this.getExtractProperties();
    }

    await AbstractController.asyncForEach(items, async (resource) => {

      const resourceExtractor = this.getResourceExtractor(resource);

      if (resourceExtractor !== this) {
        properties = resourceExtractor.getExtractProperties();
      }

      const extractedValues = await resourceExtractor.extract(resource, properties);
      const resourceAssociations = await resourceExtractor.extractResourceAssociations(resource, associations);

      Object.assign(extractedValues, resourceAssociations);

      extractedData.push(extractedValues);
    });

    return extractedData;
  }

  /**
   * @param resource
   * @param properties
   * @param associations
   * @return {{}}
   */
  async extract(resource, properties = [], associations = []) {
    const resourceExtractor = this.getResourceExtractor(resource);

    if ((resourceExtractor !== this) || !properties.length) {
      properties = resourceExtractor.getExtractProperties();
    }

    const extractedValues = resourceExtractor.extractResourceProperties(resource, properties);
    const resourceAssociations = await resourceExtractor.extractResourceAssociations(resource, associations);

    Object.assign(extractedValues, resourceAssociations);

    return extractedValues;
  }


  /**
   * @param resource
   * @param properties
   * @returns {{}}
   */
  extractResourceProperties(resource, properties) {

    const extractData = {};
    const resourceDataValues = resource.dataValues || resource;

    properties.forEach((propertyName) => {
      if (Object.prototype.hasOwnProperty.call(resourceDataValues, propertyName) || this.extractUndefinedProperties) {
        extractData[propertyName] = this.extractResourceProperty(resourceDataValues, propertyName);
      }
    });

    return extractData;
  }

  /**
   * @param resource
   * @param propertyName
   * @return {null}
   */
  extractResourceProperty(resource, propertyName) {
    return Object.prototype.hasOwnProperty.call(resource, propertyName) ? resource[propertyName] : this.defaultUndefinedPropertyValue;
  }

  /**
   *
   * @param resource
   * @param associations
   * @returns {Promise<{}>}
   */
  async extractResourceAssociations(resource, associations = []) {
    const extractedData = {};

    if (resource.dataValues) {
      await AbstractController.asyncForEach(associations, async (associationName) => {
        extractedData[associationName] = await this.getResourceAssociationValue(resource, associationName);
      });
    }

    return extractedData;
  }

  /**
   * @param resource
   * @param associationName
   * @returns {Promise<*>}
   */
  async getResourceAssociationValue(resource, associationName) {
    const getterMethod = `get${associationName.charAt(0).toUpperCase() + associationName.slice(1)}`;

    let associationValue = await resource[getterMethod]();

    switch (true) {
      case (_.isArray(associationValue) && _.hasIn(associationValue, 'length')):
        associationValue = await this.extractArray(associationValue);
        break;
      case (_.isObject(associationValue)):
        associationValue = await this.extract(associationValue);
        break;
      default:
    }

    return associationValue;
  }

  /**
   * @param resource
   * @returns {*}
   */
  getResourceExtractor(resource) {
    if (Object.prototype.hasOwnProperty.call(resource, '_modelOptions')) {

      const modelName = resource._modelOptions.name.singular;
      const model = resource._modelOptions.sequelize.models[modelName];

      return model.extractor;
    }

    return this;
  }
}


module.exports = DefaultExtractor;

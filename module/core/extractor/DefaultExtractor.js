// core/extractor/DefaultExtractor.js


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
   * @param items
   * @param properties
   * @return {Array}
   */
  extractArray(items, properties) {

    const extractData = [];

    items = items || [];

    if (!properties) {
      properties = this.getExtractProperties();
    }

    items.forEach((resource) => {
      resource = resource.dataValues ? resource.dataValues : resource;
      extractData.push(this.extract(resource, properties));
    });

    return extractData;
  }

  /**
   * @param resource
   * @param properties
   * @return {{}}
   */
  extract(resource, properties) {
    const extractData = {};

    if (!properties) {
      properties = this.getExtractProperties();
    }

    resource = resource.dataValues || resource;

    properties.forEach((propertyName) => {
      if (Object.prototype.hasOwnProperty.call(resource, propertyName) || this.extractUndefinedProperties) {
        extractData[propertyName] = this.extractResourceProperty(resource, propertyName);
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
}


module.exports = DefaultExtractor;

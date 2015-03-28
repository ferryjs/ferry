'use strict';

class Storage {

  constructor(config = {}) {
    this.config = config;
    this.engine = null;
    this.models = {};
    this.connections = {};
  }

  initialize(resources, callback) {
    throw new Error('Storage adapters must implement initialize(resources, callback)');
  }

  getModel(model) {
    // @todo Should this force the model to lowercase?
    return typeof model === 'object' ? model : this.models[model.toLowerCase()];
  }

  find(model, query, callback) {
    throw new Error('Storage adapters must implement find(model, query, callback)');
  }

  // @todo Does this method serve any real purpose?
  findOne(model, query, callback) {
    throw new Error('Storage adapters must implement findOne(model, query, callback)');
  }

  findById(model, id, callback) {
    throw new Error('Storage adapters must implement findById(model, id, callback)');
  }

  create(model, properties, callback) {
    throw new Error('Storage adapters must implement create(model, properties, callback)');
  }

  update(model, id, properties, callback) {
    throw new Error('Storage adapters must implement update(model, id, properties, callback)');
  }

  destroy(model, id, callback) {
    throw new Error('Storage adapters must implement destroy(model, id, callback)');
  }

}

export default Storage;

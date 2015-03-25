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

};

export default Storage;

'use strict';

import Waterline from 'waterline';

class Storage {
  constructor(config = {}, specification = {}) {
    this.orm = new Waterline();
    this.config = config;
    this.specification = specification;
  }

  initialize(callback) {
    for(let resource in this.specification.resources) {
      this.specification.resources[resource].schema.identity = resource.toLowerCase();
      this.specification.resources[resource].schema.connection = 'default';

      let schema = Waterline.Collection.extend(this.specification.resources[resource].schema);
      this.orm.loadCollection(schema);
    }

    this.orm.initialize(this.config, function(err, model){
      callback(err, model);
    });
  }
};

export default Storage;

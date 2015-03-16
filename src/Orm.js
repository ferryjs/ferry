'use strict';

import Waterline from 'waterline';

class Orm {
  constructor(config) {
    this.orm = new Waterline();
    this.config = config;
  }

  initialize(callback) {
    this.orm.initialize(this.config, function(err, model){
      callback(err, model);
    });
  }
};

export default Orm;

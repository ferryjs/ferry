'use strict';

import path from 'path';
import Orm from './Orm';
import Engine from './Engine';
import Adapter from './Adapter';

class Ferry {
  constructor(config) {

    if (typeof config.engine !== 'undefined' ) {
      Engine = config.engine;
    }

    if (typeof config.adapter !== 'undefined' ) {
      Adapter = config.adapter;
    }

    this.specification = new Adapter(path.join(
      path.dirname(module.parent.filename),
      config.specification
    ));

    // Instantiate a new database
    this.database = new Orm(config.database || {}, this.specification);

    // Create a new server
    this.engine = new Engine(
      this.specification,
      this.database
    );

  }

  start(port = 3000) {
    let self = this;

    this.database.initialize(function(error, model){

      if (error) {
        console.error(error);
      }
      else {
        self.engine.collections = model.collections;
        self.engine.connections = model.connections;
        self.engine.start(port);
      }

    });
  }
}

Ferry.Orm = Orm;
Ferry.Adapter = Adapter;
Ferry.Engine = Engine;

export default Ferry;

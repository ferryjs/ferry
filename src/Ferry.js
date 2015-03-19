'use strict';

import path from 'path';
import Storage from './Storage';
import Router from './Router';
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
    this.database = new Storage(config.database || {}, this.specification);

    // Create a new server
    this.engine = new Router(
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

Ferry.Storage = Storage;
Ferry.Adapter = Adapter;
Ferry.Router = Router;

export default Ferry;

'use strict';

import Router from './Router';
import Specification from './Specification';
import Storage from './Storage';

import path from 'path';

class Ferry {
  constructor(config) {

    if (typeof config === 'undefined') {
      throw new Error('Invalid configuration');
    }

    if (!(config.specification instanceof Specification)) {
      throw new Error('Specification is required');
    } else {
      this.specification = config.specification;
    }

    if (typeof config.router !== 'undefined' ) {
      Router = config.router;
    }

    // Instantiate a new database
    this.database = new Storage(config.database || {}, this.specification);

    // Create a new server
    this.router = new Router(
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
        self.router.collections = model.collections;
        self.router.connections = model.connections;
        self.router.start(port);
      }
    });
  }
}

Ferry.Router = Router;
Ferry.Specification = Specification;
Ferry.Storage = Storage;

export default Ferry;

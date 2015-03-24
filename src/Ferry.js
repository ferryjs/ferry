'use strict';

import path from 'path';
import Storage from './Storage';
import Router from './Router';
import Specification from './Specification';

class Ferry {
  constructor(config) {

    if (typeof config === 'undefined') {
      throw new Error('Invalid configuration');
    }

    if (typeof config.source === 'undefined') {
      throw new Error('Specification source missing');
    }

    if (typeof config.specification !== 'undefined' ) {
      Specification = config.specification;
    }

    if (typeof config.router !== 'undefined' ) {
      Router = config.router;
    }
    
    this.specification = new Specification(path.join(
      path.dirname(module.parent.filename),
      config.source
    ));

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

Ferry.Storage = Storage;
Ferry.Specification = Specification;
Ferry.Router = Router;

export default Ferry;

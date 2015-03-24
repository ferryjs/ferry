'use strict';

import Router from './Router';
import Specification from './Specification';
import Storage from './Storage';

import path from 'path';

class Ferry {

  constructor(config) {

    if (typeof config === 'undefined') {
      throw new Error('Configuration is required');
    }

    if (!(config.specification instanceof Specification)) {
      throw new Error('Specification is required');
    } else {
      this.specification = config.specification;
      this.specification.Ferry = this;
    }

    if (!(config.storage instanceof Storage)) {
      throw new Error('Storage is required');
    } else {
      this.storage = config.storage;
      this.storage.Ferry = this;
    }

    if (typeof config.router !== 'undefined' ) {
      Router = config.router;
    }

    // Create a new server
    this.router = new Router(
      this.specification,
      this.database
    );

  }

  start(port = 3000) {

    let self = this;

    this.storage.initialize(this.specification.resources, function(error) {

      if (error) {
        console.error(error);
      }
      else {
        // @todo Remove these from router.
        self.router.collections = self.storage.models;
        self.router.connections = self.storage.connections;
        self.router.start(port);
      }

    });

  }

}

Ferry.Router = Router;
Ferry.Specification = Specification;
Ferry.Storage = Storage;

export default Ferry;

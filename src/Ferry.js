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

    if (!(config.router instanceof Router)) {
      throw new Error('Router is required');
    } else {
      this.router = config.router;
      this.router.Ferry = this;
      this.router.initialize(this.specification.basePath, this.specification.routes);
    }

  }

  start(port = 3000, callback) {

    let self = this;

    this.storage.initialize(this.specification.resources, function(error) {

      if (error) {
        console.error(error);
      }
      else {
        self.router.start(port, callback);
      }

    });

  }

}

Ferry.Router = Router;
Ferry.Specification = Specification;
Ferry.Storage = Storage;

export default Ferry;

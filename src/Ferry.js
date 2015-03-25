'use strict';

import path from 'path';

import Router from './Router';
import Specification from './Specification';
import Storage from './Storage';

class Ferry {

  constructor(config) {

    if (typeof config === 'undefined') {
      throw new Error('Configuration is required');
    }

    if (!(config.specification instanceof Specification)) {
      throw new Error('Specification is required');
    }

    if (!(config.storage instanceof Storage)) {
      throw new Error('Storage is required');
    }

    if (!(config.router instanceof Router)) {
      throw new Error('Router is required');
    }

    this.specification = config.specification;
    this.specification.ferry = this;

    this.storage = config.storage;
    this.storage.ferry = this;

    this.router = config.router;
    this.router.ferry = this;
    this.router.initialize(this.specification.basePath, this.specification.routes);

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

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
    this.specification.initialize((err) => {

      if (err) console.error(err);

      this.storage = config.storage;
      this.storage.ferry = this;
      this.storage.initialize(this.specification.resources, (err) => {

        if (err) console.error(err);

        this.router = config.router;
        this.router.ferry = this;
        this.router.initialize(this.specification.basePath, this.specification.routes, (err) => {

          if (err) console.error(err);

          if (typeof config.callback === 'function') {
            config.callback();
          } else {
            this.start();
          }

        });

      });

    });

  }

  start(port = 3000, callback) {
    this.router.start(port, callback);
  }

}

Ferry.Router = Router;
Ferry.Specification = Specification;
Ferry.Storage = Storage;

export default Ferry;

'use strict';

import path from 'path';
import Orm from './Orm';
import DefaultEngine from './Engine';
import DefaultAdapter from './Adapter';

class Ferry {
  constructor(config) {

    let Engine =  DefaultEngine;
    let Adapter = DefaultAdapter;

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
    this.database = new Orm(config.database || {});

    // Create a new server
    this.server = new Engine(
      this.specification,
      this.database
    );

  }

  start(port = 3000) {
    let self = this;

    this.database.initialize(function(error, model){

      if (error) {
        console.error('Could not connect to databases');
      }
      else {
        self.server.app.collections = model.collections;
        self.server.app.connections = model.connections;
        self.server.start(port);
      }

    });
  }
}

export default Ferry;

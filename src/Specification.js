'use strict';

import fs from 'fs';

class Specification {

  constructor(filepath) {
    this.filepath = filepath;
  }

  initialize(callback) {

    let raw = fs.readFileSync(this.filepath, 'UTF-8');

    this.parse(raw, () => {

      this.process();

      if (typeof callback === 'function') {
        callback();
      }

    });

  }

  parse(raw, callback) {
    try {

      this.source = JSON.parse(raw);

      if (typeof callback === 'function') {
        callback();
      }

    } catch (err) {
      throw new Error('Specification source is not valid JSON');
    }
  }

  process() {
    this.basePath = this.source.basePath;
    this.version = this.source.version;
    this.resources = this.source.resources;
    this.routes = this.source.routes;
  }

}

export default Specification;

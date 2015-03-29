'use strict';

import fs from 'fs';

class Specification {

  constructor(filename) {
    this.filename = filename;
    this.load();
    this.parse();
    this.process();
  }

  load() {
    this.raw = fs.readFileSync(this.filename, 'UTF-8');
  }

  parse() {
    try {
      this.source = JSON.parse(this.raw);
    } catch (e) {
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

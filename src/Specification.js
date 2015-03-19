'use strict';

import fs from 'fs';
import path from 'path';

class Specification {
  constructor(filename) {
    this.filename = filename;
    this.load();
    this.convert();
  }

  load() {
    this.raw = fs.readFileSync(this.filename, 'UTF-8');
    this.source = JSON.parse(this.raw);
  }

  convert() {
    // Implement this in your adapter
    this.basePath = this.source.basePath;
    this.resources = this.source.resources;
  }
};

export default Specification;

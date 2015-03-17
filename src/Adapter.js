'use strict';

import fs from 'fs';
import path from 'path';

class Adapter {
  constructor(specification, cwd) {
    this.filename = specification;
    this.load();

    this.convert();
  }

  load() {
    this.raw = fs.readFileSync(this.filename, 'UTF-8');
    this.specification = JSON.parse(this.raw);
  }

  convert() {
    // Implement this in your adapter
    this.basePath = this.specification.basePath;
    this.resources = this.specification.resources;
  }
};

export default Adapter;

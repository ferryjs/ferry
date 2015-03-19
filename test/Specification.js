'use strict';

import assert from 'assert';
import fs from 'fs';
import Specification from '../src/Specification'

describe('Class:Specification', () => {

  let fixture = {
    source: ''
  };

  before(() =>{
     fixture.source = __dirname + '/fixtures/spec.json';
  });

  it('Constructor:default', () => {
    assert(typeof Specification === 'function');

    let instance = new Specification(fixture.source);

    assert(instance instanceof Specification);

    assert(typeof instance.load === 'function');
    assert(typeof instance.convert === 'function');

    assert(typeof instance.filename !== 'undefined');
    assert.deepEqual(instance.filename, fixture.source);
  });

  it('Method:Load', () => {
    let instance = new Specification(fixture.source);
    let source = fs.readFileSync(fixture.source, 'UTF-8');

    assert(typeof instance.raw !== 'undefined');
    assert.equal(instance.raw, source);

    assert(typeof instance.source !== 'undefined');
    assert.deepEqual(instance.source, JSON.parse(source));
  });

  it('Method:Convert', () => {
    let instance = new Specification(fixture.source);
    let source = fs.readFileSync(fixture.source, 'UTF-8');

    source = JSON.parse(source);

    assert(typeof instance.resources !== 'undefined');
    assert.deepEqual(instance.resources, source.resources);

    assert(typeof instance.basePath !== 'undefined');
    assert(instance.basePath, source.basePath);
  });
});

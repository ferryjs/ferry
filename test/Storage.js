'use strict';

import assert from 'assert';
import Waterline from 'waterline';
import Storage from '../src/Storage';
import Specification from '../src/Specification'

describe('Class:Storage', () => {

  let fixture = {
    source: '',
    config: {}
  };

  before(() =>{
    fixture.source = __dirname + '/fixtures/spec.json';
    fixture.config = require('./fixtures/database')
  });

  it('Constructor:default', () => {
    assert(typeof Storage === 'function');

    let instance = new Storage();

    assert(instance instanceof Storage);

    assert(typeof instance.initialize === 'function');

    assert(typeof instance.config !== 'undefined');
    assert.deepEqual(instance.config, {});

    assert(typeof instance.specification !== 'undefined');
    assert.deepEqual(instance.specification, {});

    assert(typeof instance.orm !== 'undefined');
    assert(instance.orm instanceof Waterline);
  });

  it('Constructor:options', () => {
    let config = {};
    let specification = {};

    let instance = new Storage(config, specification);

    assert(typeof instance.config !== 'undefined');
    assert.deepEqual(instance.config, config);

    assert(typeof instance.specification !== 'undefined');
    assert.deepEqual(instance.specification, specification);
  });

  it('Method:Initialize', (next) => {

    let specification = new Specification(fixture.source);

    let instance = new Storage(fixture.config, specification);

    instance.initialize(function(err, model){

      assert(!err);

      let schema = instance.specification.resources.Item.schema;

      assert.equal(schema.identity, 'item');
      assert.equal(schema.connection, 'default');

      next();
    });


  });

});

'use strict';

import assert from 'assert';
import Ferry from '../src/Ferry';
import Storage from '../src/Storage';
import Router from '../src/Router';
import Specification from '../src/Specification';

import * as Module from '../src/Ferry'

describe('Module:Ferry', () => {

  it('Exports', () => {
    assert(typeof Module.default.Storage !== 'undefined');
    assert.deepEqual(Module.default.Storage, Storage);

    assert(typeof Module.default.Router !== 'undefined');
    assert.deepEqual(Module.default.Router, Router);

    assert(typeof Module.default.Specification !== 'undefined');
    assert.deepEqual(Module.default.Specification, Specification);
  });

});

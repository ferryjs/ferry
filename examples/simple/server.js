'use strict';

var diskAdapter = require('sails-disk');
var Ferry = require('../../lib/Ferry');

var server = new Ferry({
  specification: './spec.json',
  database: {
    adapters: {
      default: diskAdapter
    },
    connections: {
      default: {
        adapter: "default"
      }
    }
  }
});

server.start(3333);

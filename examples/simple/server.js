'use strict';

var Ferry = require('ferry');

var server = new Ferry({
  source: './spec.json',
  database: {
    adapters: {
      default: require('sails-disk')
    },
    connections: {
      default: {
        adapter: "default"
      }
    }
  }
});

server.start(process.env.PORT || 3333);

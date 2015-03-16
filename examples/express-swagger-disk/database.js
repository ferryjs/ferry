'use strict';

var diskAdapter = require('sails-disk');

module.exports = {
  adapters: {
    default: diskAdapter
  },
  connections: {
    default: {
      adapter: "default"
    }
  }
};

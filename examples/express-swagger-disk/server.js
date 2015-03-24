'use strict';

var router = require('ferry-express');
var specification = require('ferry-swagger');
var databaseConfig = require('./database');

var Ferry = require('ferry');

var server = new Ferry({
  router: router,
  specification: specification,
  source: './swagger.json',
  database: databaseConfig
});

server.start(3333);

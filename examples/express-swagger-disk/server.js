'use strict';

var engine = require('ferry-express');
var adapter = require('ferry-swagger');
var databaseConfig = require('./database');

var Ferry = require('../../lib/Ferry');

var server = new Ferry({
  engine: engine,
  adapter: adapter,
  specification: './swagger.json',
  database: databaseConfig
});

server.start(3333);

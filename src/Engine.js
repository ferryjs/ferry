'use strict';

import http from 'http';
import Router from 'router';
import finalHandler from 'finalhandler';

class Engine {
  constructor(specification, database) {
    this.name = 'Default';
    this.specification = specification;
    this.app = new Router();

    this.initialize();
  }

  route(type, model) {

    switch (type) {

      case 'index':
        return (req, res)=> {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end('Index');
        };
        break;

      case 'find':
        return (req, res)=> {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end('Find');
        };
        break;

      case 'create':
        return (req, res)=> {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end('Create');
        };
        break;

      case 'update':
        return (req, res)=> {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end('Update');
        };
        break;

      case 'delete':
        return (req, res)=> {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end('Delete');
        };
        break;
    }

  }

  initialize() {
    let router = new Router();

    for(let path in this.specification.routes) {

      for(let method in this.specification.routes[path]) {

        let action = this.specification.routes[path][method].operationId.split(':')[1].toLowerCase();

        router[method](path, this.route(action));
      }
    };

    this.app.use(
      this.specification.basePath,
      router
    );
  }

  start(port = 3000) {
    let self = this;
    http.createServer(function(req, res) {
      self.app(req, res, finalHandler(req, res))
    }).listen(port);
  }
};

export default Engine;

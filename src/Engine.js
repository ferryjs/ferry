'use strict';

import http from 'http';
import Router from 'router';
import finalHandler from 'finalhandler';

class Engine {
  constructor(specification, database) {
    this.name = 'Default';
    this.specification = specification;
    this.app = new Router();
  }

  route(resource, type) {

    let collection = this.collections[resource.toLowerCase()];

    switch (type) {

      case 'index':
        return (req, res)=> {
          collection.find().exec(function(err, models) {
            if(err) return res.json(JSON.stringify({ err: err }), 500);

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(models));
          });
        };
        break;

      case 'view':
        return (req, res)=> {
          collection.findOne({ id: req.params.id }, function(err, model) {
            if(err) return res.end(JSON.stringify({ err: err }), 500);

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(model));
          });
        };
        break;

      case 'create':
        return (req, res)=> {
          collection.create(req.body, function(err, model) {
            if(err) return res.end(JSON.stringify({ err: err }), 500);

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(model));
          });
        };
        break;

      case 'update':
        return (req, res)=> {
          // Don't pass ID to update
          delete req.body.id;

          collection.update({ id: req.params.id }, req.body, function(err, model) {
            if(err) return res.end(JSON.stringify({ err: err }), 500);
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(model));
          });
        };
        break;

      case 'delete':
        return (req, res)=> {
          collection.destroy({ id: req.params.id }, function(err) {
            if(err) return res.end(JSON.stringify({ err: err }), 500);

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end('{"status": "ok"}');
          });
        };
        break;

      default:

        // Look for overriden handler actions

        break;
    }

  }

  initialize() {
    let router = new Router();

    for(let resource in this.specification.resources) {
      let resourceRouter = new Router();
      let basePath = this.specification.resources[resource].basePath;

      for(let action in this.specification.resources[resource].actions) {
        let method = this.specification.resources[resource].actions[action].method;
        let route = this.specification.resources[resource].actions[action].route;

        resourceRouter[method](route, this.route(resource, action));
      }
      router.use(basePath, resourceRouter);
    };

    this.app.use(
      this.specification.basePath,
      router
    );
  }

  start(port = 3000) {

    this.initialize();

    let self = this;
    http.createServer(function(req, res) {
      self.app(req, res, finalHandler(req, res))
    }).listen(port);
  }
};

export default Engine;

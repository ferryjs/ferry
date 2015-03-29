'use strict';

class Router {

  constructor(config = {}) {
    this.name = null;
    this.config = config;
    this.app = null;
  }

  route(action, resource) {
    throw new Error('Router adapters must implement route(action, resource)');
  }

  initialize(basePath, routes, callback) {
    throw new Error('Router adapters must implement initialize(basePath, routes, callback)');
  }

  start(port = 3000, callback) {
    throw new Error('Router adapters must implement start(port, callback)');
  }

}

export default Router;

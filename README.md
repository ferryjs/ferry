# Ferry

[![wercker status](https://app.wercker.com/status/db691bd039bb0c0640e6e934d47d7dec/s "wercker status")](https://app.wercker.com/project/bykey/db691bd039bb0c0640e6e934d47d7dec)

Ferry is (yet another) REST API framework.


## Usage

Typically, Ferry is required as a dependency when creating a server implementation. See [example implementations](https://github.com/ferryjs/ferry-examples).


## Engines

Engines power Ferry; they are third-party modules that provide various features. In order to create a functional API, one engine of each type is required.

Adapters are Ferry modules that provide the interface between an engine and the Ferry framework.

### Router

* [Router](https://github.com/pillarjs/router) ([adapter](https://github.com/ferryjs/ferry-router-basic))
* [Express](http://expressjs.com) ([adapter](https://github.com/ferryjs/ferry-express))
* [Hapi](http://hapijs.com) ([adapter](https://github.com/ferryjs/ferry-hapi))
* [Koa](http://koajs.com) ([adapter](https://github.com/ferryjs/ferry-koa))

### Specification

* [Swagger](http://swagger.io) ([adapter](https://github.com/ferryjs/ferry-swagger))
* [RAML](http://raml.org) ([adapter](https://github.com/ferryjs/ferry-raml))
* [API Blueprint](https://apiblueprint.org) ([adapter](https://github.com/ferryjs/ferry-api-blueprint))

### Storage

* [Waterline](https://github.com/balderdashy/waterline) ([adapter](https://github.com/ferryjs/ferry-waterline))


## Contributing

### Development

An easy way to work on the Ferry suite of packages is to clone all of the desired repositories into a top-level `ferryjs` directory, and then use the [symlink](https://www.npmjs.com/package/symlink) package to automatically `npm link` the local repositories.

- `npm install -g symlink` (at least v1.0.0)
- `cd ferryjs`
- `git clone https://github.com/ferryjs/ferry.git` (do this for all ferry repositories)
- `git clone https://github.com/ferryjs/ferry-examples.git`
- `symlink ./ ferry-examples/` (and include any other directories that contain ferry projects)

If the `symlink` and/or `npm link` steps error out, just re-run them.

# Ferry

[![wercker status](https://app.wercker.com/status/db691bd039bb0c0640e6e934d47d7dec/s "wercker status")](https://app.wercker.com/project/bykey/db691bd039bb0c0640e6e934d47d7dec)

Ferry is (yet another) REST API framework.


## Installation

* `npm install` - This will pull down dependencies and compile source.


## Usage

See [example implementations](https://github.com/ferryjs/ferry-examples).


## Compatibility

### Router Adapters

* [Express](http://expressjs.com) [adapter](https://github.com/ferryjs/ferry-express)
* [Hapi](http://hapijs.com) [adapter](https://github.com/ferryjs/ferry-hapi)
* [Koa](http://koajs.com) [adapter](https://github.com/ferryjs/ferry-koa)

### Specification Adapters

* [Swagger](http://swagger.io) [adapter](https://github.com/ferryjs/ferry-swagger)
* [Blueprint](https://apiblueprint.org) [adapter](https://github.com/ferryjs/ferry-api-blueprint)
* [RAML](http://raml.org) [adapter](https://github.com/ferryjs/ferry-raml)

### Storage Adapters

* [Waterline](https://github.com/balderdashy/waterline) [adapter](https://github.com/ferryjs/ferry-waterline)


## Contributing

### Local Development

An sorta-easy way to work on the Ferry suite of packages is to clone all of the desired repositories into a top-level `ferryjs` directory, and then use the [symlink](https://www.npmjs.com/package/symlink) package to automatically `npm link` the local repositories.

- `npm install -g symlink`
- `cd ferryjs`
- `git clone https://github.com/ferryjs/ferry.git` (do this for all repositories)
- `git clone https://github.com/ferryjs/ferry-examples.git`
- `symlink .`
- `cd ferry-examples/express-swagger-disk`
- `npm link ferry ferry-express ferry-swagger ferry-waterline`

If the `symlink` and/or `npm link` steps error out, just re-run them.

The last two steps should be unnecessary but are required at this time; hopefully once these packages are published on NPM they will become obsolete.

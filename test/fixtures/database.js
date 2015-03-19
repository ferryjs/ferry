'use strict';

export default {
  adapters: {
    default: require('sails-disk')
  },
  connections: {
    default: {
      adapter: "default"
    }
  }
}

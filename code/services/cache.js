const redis = require('redis');

const instances = {};

const getInstance = function(config, name = 'default') {
  if (!instances[name]) {
    instances[name] = redis.createClient(config);
  }
  return instances[name];
}

module.exports = getInstance;

var redis = require('redis'),
    path = require('path'),
    configs = require(path.join(process.cwd(), 'configs', 'redis')),
    __client,
    __prefix;

this.init = function () {
    __client = redis.createClient(configs.port, configs.host, configs.options);
    if (process.env.REDISDB) {
        __client.select(+process.env.REDISDB);
    }
    __prefix = configs.prefix || '';
}

this.getInstance = function () {
    return __client;
}

this.set = function (key, value, expires) {
    key = __prefix + key;
    value = JSON.stringify(value);
    expires = expires || 86400 * 7;
    return new Promise(function (resolve, reject) {
        __client.set(key, value, function (err) {
            if (err) {
                return reject(err);
            }
            __client.expire(key, expires);
            resolve();
        });
    });
}

this.get = function (key) {
    key = __prefix + key;
    return new Promise(function (resolve, reject) {
        __client.get(key, function (err, data) {
            if (err) {
                return reject(err);
            }
            data = JSON.parse(data);
            resolve(data);
        });
    });
}

this.remove = function (key) {
    key = __prefix + key;
    return __client.del(key);
}
var path = require('path');
var Sequelize = require('sequelize');
var requireDir = require('require-dir');
var _ = require('underscore');
var dbConfig = require(path.join(process.cwd(), 'configs', 'db'));
var models = requireDir('../models');
var __db;

this.init = function () {
    var promises = [];
    __db = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.driver,
        port:    dbConfig.port,
        logging: +process.env.DBLOG ? console.log : null
    });
    __db.authenticate().catch(function (err) {
        console.error(err);
        throw 'Database connection failed'
        process.exit();
    })
    _.each(models, function (model, name) {
        var modelObject = __db.define(name, model.attributes, model.options);
        if (process.env.INITDB) {
            modelObject.sync();
            promises.push(modelObject.sync());
        }
    });
    return Promise.all(promises);
}

this.getInstance = function () {
    return __db;
}
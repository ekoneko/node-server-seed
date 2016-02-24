var fs = require('fs');
var path = require('path');
var router = require('express').Router();
var requireDir = require('require-dir');
var controllers = requireDir('./controllers');
var auth = require('./services/auth.js');
var multipartMiddleware = require('connect-multiparty')();


var nodeModulesPath = path.resolve('node_modules');
router.get('/node_modules/*', function (req, res, next) {
    var file = path.resolve('.', req.url.replace(/^\//, ''));
    if (file.indexOf(nodeModulesPath) === 0) {
        if (fs.existsSync(file)) {
            return res.sendFile(file);
        }
    }
    next();
});

router.post('/user/info', controllers.user.info);
router.get('/ping', controllers.test.ping);
router.use('/', function (req, res) {
    res.send('=x=');
});

module.exports = router;

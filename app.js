var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

/**
 * Load environment
 */
var path = require('path');
var env = require('node-env-file');
env('.env');

/**
 * Init thirdPart Server
 */
var db = require('./code/services/db.js');
var redis = require('./code/services/cache.js');
db.init();
redis.init();

var routes = require('./code/routes.js');
var app = express();

if (process.env.DEV) {
    var logger = require('morgan');
    app.use(logger('dev'));
}

/**
 * webpack
 */
/*
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: '/'
}));
app.use(webpackHotMiddleware(compiler, {}));
*/

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use('/', routes);

// view engine setup
/*
var hbs = require('express-hbs');
app.engine('hbs', hbs.express3({
    partialsDir: path.join(__dirname, 'code/views'),
}));
app.set('views', path.join(__dirname, 'code/views'));
app.set('view engine', 'hbs');
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.DEV) {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(err.message);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;

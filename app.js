var express = require('express');
var path = require('path');
var logger = require('morgan');
var auth = require('http-auth');
var conf = require('./conf').get();

var routes = require('./routes/index');
var app = express();
app.use(logger('dev'));

if (conf.auth.type !== 'none') {
    app.use(auth.connect(
        auth[conf.auth.type](conf.auth)
    ));
}

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    'use strict';
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;


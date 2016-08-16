'use strict';

var config = require('./middleware/config').config;
var dlog = require('./middleware/config').dlog;

var express = require('express');
var app = express();
/* api routes */
var systemRouter = require('./middleware/system');
//var osmcRouter = require('./middleware/osmc');
var transmissionRouter = require('./middleware/transmission');
//var tvshowsRouter = require('./middleware/tvshows');
//var pimaticRouter = require('./middleware/pimatic');


/* LOG FUNCTION */
app.use(function timeLog(req, res, next) {
    dlog("GET [" + req.url + "]");
    next();
});
/* STATIC */
app.use(express.static('./release'));

/* API */
app.use('/api/system', systemRouter);
//router.use('/api/osmc', osmcRouter);
app.use('/api/transmission', transmissionRouter);
//router.use('/api/tvshows', tvshowsRouter);
//router.use('/api/pimatic', pimaticRouter);


dlog("starting server on port " + config.system.webPort);

app.listen(config.system.webPort);
'use strict';

var config = require('./middleware/config').config;
var log = require('./middleware/log');

var express = require('express');
var httpProxy = require('http-proxy');
var app = express();

/* api routes */
var configRouter = require('./middleware/config').router;
var systemRouter = require('./middleware/system');
var osmcRouter = require('./middleware/osmc');
var torrentsRouter = require('./middleware/transmission');
//var tvshowsRouter = require('./middleware/tvshows');
//var pimaticRouter = require('./middleware/pimatic');

/* HTTP request logging */
app.use(function timeLog(req, res, next) {
  log.i(req.method +" [" + req.url + "]");
  next();
});

/* serve static content */
app.use(express.static('./release'));

/* serve API */
app.use('/api/config', configRouter);
app.use('/api/system', systemRouter);
app.use('/api/osmc', osmcRouter);
app.use('/api/torrents', torrentsRouter);
//router.use('/api/tvshows', tvshowsRouter);
//router.use('/api/pimatic', pimaticRouter);


//var proxy = httpProxy.createProxyServer({
//  target: {
//    host: config.xbmc.host,
//    port: config.xbmc.port
//  },
//  ws: true
//});
//proxy.on('error', function (err) {
//  log.e('error on proxying websocket');
//  log.e(err);
//});
//app.on('upgrade', function (req, socket, head) {
//  log.d('proxy upgrade');
//  proxy.ws(req, socket, head);
//});

log.i("starting ws proxy server on port " + 5001);
httpProxy.createServer({
  target: 'ws://' + config.xbmc.host + ':' + config.xbmc.port + '/jsonrpc',
  ws: true
}).listen(5001);

/* start server */
log.i("starting server on port " + config.system.webPort);
app.listen(config.system.webPort);
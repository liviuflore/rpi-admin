'use strict';

var config = require('./config').config;
var log = require('./log');
var cache = require('./cache');

var express = require('express');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.json());

var xbmcconfig = {
  host: config.xbmc.host,
  port: config.xbmc.port,
};


/* create proxy for kodi json-rpc */
log.i("starting ws proxy server on port " + 5001);
var proxy = httpProxy.createServer({
  target: 'ws://' + config.xbmc.host + ':' + config.xbmc.port + '/jsonrpc',
  ws: true
});
proxy.listen(5001);

proxy.on('error', function (err, req, res) {
  log.d('kodiProxy: on error: ' + err);
});
proxy.on('open', function (proxySocket) {
  log.d('kodiProxy: on open');
});
proxy.on('close', function (res, socket, head) {
  log.d('kodiProxy: on close');
});
proxy.on('upgrade', function (req, socket, head) {
  log.d('kodiProxy: on upgrade');
});

router.get('/stats', function (req, res) {
  res.json({ 'result': 'OK' });
});


module.exports = router;

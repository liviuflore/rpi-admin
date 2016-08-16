'use strict';

var log = require('./log');
var fs = require('fs');
var express = require('express');
var router = express.Router();

var config = {
  system: {
    webPort: 5000,
    statsUpdateInterval: 5000,
  },
  transmission: {
    host: '192.168.1.21',
    port: 9091,
    username: 'osmc',
    password: 'liviu22',
    url: '/transmission/rpc',
  }
}
try {
  config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
}
catch (e) {
  log.e('config file not found, loading defaults');
}
//log.d(config);



router.get('/system', function (req, res) {
    res.json(config.system);
});

router.get('/transmission', function (req, res) {
    res.json(config.transmission);
});


module.exports = { router, config, log };

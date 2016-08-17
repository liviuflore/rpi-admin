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
    host: '127.0.0.1',
    port: 9091,
    username: 'transmission',
    password: 'transmission',
    url: '/transmission/rpc',
  }
}

var config_filename = 'config.json';
try {
  config = JSON.parse(fs.readFileSync(config_filename, 'utf8'));
}
catch (e) {
  log.e('config file not found, loading defaults');
  fs.writeFile(config_filename, JSON.stringify(config, null, 4), function (err) {
    if (err) {
      log.e('could not write file ' + config_filename + ' [' + err + ']');
      return;
    }
  });
}
//log.d(config);



router.get('/system', function (req, res) {
    res.json(config.system);
});

router.get('/transmission', function (req, res) {
    res.json(config.transmission);
});


module.exports = { router, config, log };

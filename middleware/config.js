'use strict';

var log = require('./log');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

var config = {
  system: {
    webPort: 5000,
    statsUpdateInterval: 5000,
  },
  torrents: {
    client: 'transmisison',
    host: '127.0.0.1',
    port: 9000,
    username: 'admin',
    password: 'admin',
    url: '/rpc',
    downloadDir: '~/downloads/complete',
    startWhenAdded: true,
    upLimit: 1000,
    upLimitEn: false,
    downLimit: 1000,
    downLimitEn: false,
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


router.get('/get', function (req, res) {
  //log.d(config);
  res.json(config);
});

router.post('/save', function (req, res) {
  log.d(req.body);
  config = req.body; // TODO: should chack config first ... ???
  fs.writeFile(config_filename, JSON.stringify(config, null, 4), function (err) {
    if (err) {
      log.e('could not write file ' + config_filename + ' [' + err + ']');
      res.json({ 'result': 'ERROR' });
    } else {
      res.json({ 'result': 'OK' });
    }
  });
});


module.exports = { router, config, log };

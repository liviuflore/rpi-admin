'use strict';

var log = require('./log');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

/* default config */
var config = {
  system: {
    webPort: 5000,
    statsUpdateInterval: 5000,
    debugLevel: 'd',
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
  },
}

function extend(origin, add) {
  if (!add || (typeof add !== 'object' && add !== null)) {
    return origin;
  }

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    if (!add[keys[i]] || (typeof add[keys[i]] !== 'object' && add[keys[i]] !== null)) {
      //console.log("k: " + keys[i] + " a: " + add[keys[i]]);
      origin[keys[i]] = add[keys[i]];
    } else {
      extend(origin[keys[i]], add[keys[i]])
    }
  }
  return origin;
};

/* config file */
var config_filename = 'config.json';
try {
  config = extend(config, JSON.parse(fs.readFileSync(config_filename, 'utf8')));
}
catch (e) {
  log.e('config file load failed, loading defaults');
  fs.writeFile(config_filename, JSON.stringify(config, null, 4), function (err) {
    if (err) {
      log.e('could not write file ' + config_filename + ' [' + err + ']');
      process.exit();
    }
  });
}

log.setLogLevel(config.system.debugLevel);
log.d(config);

/* config routes */
router.get('/get', function (req, res) {
  log.d(config);
  res.json(config);
});

router.post('/save', function (req, res) {
  log.d(req.body);
  config = extend(config, req.body);
  fs.writeFile(config_filename, JSON.stringify(config, null, 4), function (err) {
    if (err) {
      log.e('could not write file ' + config_filename + ' [' + err + ']');
      res.json({ 'result': 'ERROR' });
    } else {
      res.json({ 'result': 'OK' });
    }
  });
});


module.exports = { router, config };

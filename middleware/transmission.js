'use strict';

var config = require('./config').config;
var log = require('./log');
var cache = require('./cache');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());


var Transmission = require("transmission");
var tconfig = {
  host: config.torrents.host,
  port: config.torrents.port,
  username: config.torrents.username,
  password: config.torrents.password,
  url: config.torrents.url,
};
var transmission = new Transmission(tconfig);

router.get('/stats', function (req, res) {
    transmission.sessionStats(function (err, result) {
        if (err) {
            log.e(err);
            res.json({ 'result': 'ERROR' });
        } else {
            res.json(result);
        }
    });
});

router.get('/list', function (req, res) {
    transmission.get(function (err, result) {
        if (err) {
            log.e(err);
            res.json({ 'result': 'ERROR' });
        } else {
            result.torrents.forEach(function (torrent) { log.d("Torrent id: " + torrent.id + ", status: " + torrent.status); });
            log.d("got " + result.torrents.length + " torrents");
            res.json(result);
        }
    });
});

router.all('/delete/:torrents/:deleteData', function (req, res) {
    var torrents = req.params.torrents.split(",").map(function (item) {
      return parseInt(item, 10);
    });
    log.d("delete torrents: " + torrents + " delete data: " + req.params.deleteData + " is ignored");

    transmission.remove(torrents, function (err) {
      if (err) {
        log.e(err);
        res.json({ 'result': 'ERROR' });
      } else {
        res.json({ 'result': 'OK' });
      }
    });
});

router.all('/stop/:torrents', function (req, res) {
    var torrents = req.params.torrents.split(",").map(function (item) {
      return parseInt(item, 10);
    });
    log.d("stop torrents: " + torrents);

    transmission.stop(torrents, function (err) {
      if (err) {
        log.e(err);
        res.json({ 'result': 'ERROR' });
      } else {
        res.json({ 'result': 'OK' });
      }
    });
});

router.all('/start/:torrents', function (req, res) {
    var torrents = req.params.torrents.split(",").map(function (item) {
      return parseInt(item, 10);
    });
    log.d("start torrents: " + torrents);

    transmission.start(torrents, function (err) {
      if (err) {
        log.e(err);
        res.json({ 'result': 'ERROR' });
      } else {
        res.json({ 'result': 'OK' });
      }
    });
});

var tcache = new cache('torrents_location.cache');
tcache.Load();

router.get('/cacheDownloadDir', function (req, res) {
  log.d("get cacheDownloadDir: " + JSON.stringify(tcache.data, null, 4));
  res.json(tcache.data);
});

function AddDdirToCache(addir) {
  if (addir == '')
    return;

  var exists = false;
  tcache.data.forEach(function (item) {
    if (item && !(typeof item !== 'object' && item !== null)) {
      if (item.ddir && (item.ddir !== null) && item.ddir == addir) {
        exists = true;
      }
    }
  });
  if (!exists) {
    log.d('location cache add: ' + addir);
    tcache.data.push({ ddir: addir });
    tcache.Save();
  }
}

router.post('/addTorrent', function (req, res) {
  var add = req.body;
  log.d("add torrent: " + JSON.stringify(add, null, 4));
  if (!add || (typeof add !== 'object' && add !== null)) {
    log.d("add torrent failed");
    res.json({ 'result': 'ERROR' });
    return;
  }
  if (add.magnet == '' || add.ddir == '') {
    log.d("add torrent failed");
    res.json({ 'result': 'ERROR' });
    return;
  }

  // add dir to cache
  AddDdirToCache(add.ddir);

  // add magnet link to transmission
  transmission.addUrl(add.magnet, { "download-dir": add.ddir }, function (err, arg) {
    if (err) {
      log.e(err);
      res.json({ 'result': 'ERROR' });
    } else {
      res.json({ 'result': 'OK' });
    }
  });

});

module.exports = router;

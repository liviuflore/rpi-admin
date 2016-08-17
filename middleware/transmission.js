'use strict';

var config = require('./config').config;
var log = require('./log');

var express = require('express');
var router = express.Router();

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
    var torrents = req.params.torrents.split(",");
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
    var torrents = req.params.torrents.split(",");
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
    var torrents = req.params.torrents.split(",");
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

module.exports = router;

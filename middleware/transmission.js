'use strict';

var config = require('./config').config;
var dlog = require('./config').dlog;

var express = require('express');
var router = express.Router();

var Transmission = require("transmission");
var transmission = new Transmission(config.transmission);

router.get('/stats', function (req, res) {
    transmission.sessionStats(function (err, result) {
        if (err) {
            dlog("ERROR: " + err);
            res.json({});
        } else {
            res.json(result);
        }
    });
});

router.get('/torrents', function (req, res) {
    transmission.get(function (err, result) {
        if (err) {
            dlog("ERROR: " + err);
            res.json({});
        } else {
            result.torrents.forEach(function (torrent) { dlog("Tid: " + torrent.id + ", s: " + torrent.status); });
            dlog("got " + result.torrents.length + " torrents");
            res.json(result);
        }
    });
});

router.all('/delete_torrents/:torrents/:deleteData', function (req, res) {
    var torrents = req.params.torrents.split(",");
    dlog("delete torrents: " + torrents + " delete data: " + req.params.deleteData + " is ignored");
    transmission.remove(torrents, function (err) {
        if (err)
            dlog("ERROR: " + err);
    });
    res.json({});
});
router.all('/stop_torrents/:torrents', function (req, res) {
    var torrents = req.params.torrents.split(",");
    dlog("stop torrents: " + torrents);
    transmission.stop(torrents, function (err) {
        if (err)
            dlog("ERROR: " + err);
    });
    res.json({});
});
router.all('/start_torrents/:torrents', function (req, res) {
    var torrents = req.params.torrents.split(",");
    dlog("start torrents: " + torrents);
    transmission.start(torrents, function (err) {
        if (err)
            dlog("ERROR: " + err);
    });
    res.json({});
});

router.get('/settings', function (req, res) {
  res.json(config.transmission);
});

module.exports = router;

'use strict';

var config = require('./config').config;
var dlog = require('./log');

var express = require('express');
var router = express.Router();

var Transmission = require("transmission");
var transmission = new Transmission(config.transmission);

router.get('/stats', function (req, res) {
    transmission.sessionStats(function (err, result) {
        if (err) {
            dlog.e(err);
            res.json({});
        } else {
            res.json(result);
        }
    });
});

router.get('/torrents', function (req, res) {
    transmission.get(function (err, result) {
        if (err) {
            dlog.e(err);
            res.json({});
        } else {
            result.torrents.forEach(function (torrent) { dlog.d("Tid: " + torrent.id + ", s: " + torrent.status); });
            dlog.d("got " + result.torrents.length + " torrents");
            res.json(result);
        }
    });
});

router.all('/delete_torrents/:torrents/:deleteData', function (req, res) {
    var torrents = req.params.torrents.split(",");
    dlog.d("delete torrents: " + torrents + " delete data: " + req.params.deleteData + " is ignored");
    transmission.remove(torrents, function (err) {
        if (err)
            dlog.e(err);
    });
    res.json({});
});
router.all('/stop_torrents/:torrents', function (req, res) {
    var torrents = req.params.torrents.split(",");
    dlog.d("stop torrents: " + torrents);
    transmission.stop(torrents, function (err) {
        if (err)
            dlog.e(err);
    });
    res.json({});
});
router.all('/start_torrents/:torrents', function (req, res) {
    var torrents = req.params.torrents.split(",");
    dlog.d("start torrents: " + torrents);
    transmission.start(torrents, function (err) {
        if (err)
            dlog.e(err);
    });
    res.json({});
});

module.exports = router;

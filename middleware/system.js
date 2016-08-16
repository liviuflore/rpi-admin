'use strict';

var config = require('./config').config;
var dlog = require('./config').dlog;

var os = require("./osutils");
var express = require('express');
var router = express.Router();

os.startStatGather(config.system.statsUpdateInterval);

router.get('/cpustats', function (req, res) {
    res.json({
        cpuTemp: os.cpuTempLast(),
        cpuFreq: os.cpuSpeed(),
        cpuFreqMax: os.cpuSpeed(),
        cpuLoad: Math.round(os.cpuUsageLast()),
        ramUsed: Math.round(os.usedmem()),
        ramTotal: Math.round(os.totalmem())
    });
});

router.get('/hostname', function (req, res) {
    res.json({ hostname: os.hostname() });
});

router.get('/uptime', function (req, res) {
    res.json({ hostname: os.sysUptime() });
});

router.get('/settings', function (req, res) {
  res.json(config.system);
});

module.exports = router;

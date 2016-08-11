'use strict';

var gutil = require('gulp-util');
var os = require("./osutils");

var express = require('express');
var router = express.Router();

os.startStatGather(5000);

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


module.exports = router;
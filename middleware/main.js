'use strict';

var gutil = require('gulp-util');
var os = require("./osutils");

function cpuAverage() {
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();
    for (var i = 0, len = cpus.length; i < len; i++) {
        var cpu = cpus[i];
        var type;
        for (type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    }
    return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}

module.exports = function (app) {
    var logger = function (req, res, next) {
        gutil.log("API req: [" + req.url + "]");
        next(); // Passing the request to the next handler in the stack.
    }
    app.use(logger);

    /* start timer for cpu load measurement */
    os.startStatGather(5000);

    app.get('/', function (req, res) {
        gutil.log("debug test" + os.hostname());
    });

    app.get('/cpustats', function (req, res) {
        res.json({
            cpuTemp: os.cpuTempLast(),
            cpuFreq: os.cpuSpeed(),
            cpuFreqMax: os.cpuSpeed(),
            cpuLoad: Math.round(os.cpuUsageLast()),
            ramUsed: Math.round(os.usedmem()),
            ramTotal: Math.round(os.totalmem())
        });
    });

    app.get('/hostname', function (req, res) {
        gutil.log("hostname: " + os.hostname());
        res.json({ hostname: os.hostname() });
    });
};
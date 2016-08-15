'use strict';

var config = {
    port: 5000,
    system: {
        statsUpdateInterval: 5000,
    },
    transmission: {
        host: '192.168.1.21',
        port: 9091,
        username: 'osmc',
        password: 'liviu22',
        url: '/transmission/rpc',
    }
}

var gutil = require('gulp-util');
var dlog = function (params) {
    gutil.log(params);
}

module.exports = { config, dlog };

'use strict';

var gutil = require('gulp-util');
var logLevel = 'e';

exports.e = function (params) {
  if (['e', 'w', 'i', 'd'].indexOf(logLevel) > -1)
    gutil.log(gutil.colors.red('[ERR] '), params);
};
exports.w = function (params) {
  if (['w', 'i', 'd'].indexOf(logLevel) > -1)
    gutil.log(gutil.colors.yellow('[WRN] '), params);
};
exports.i = function (params) {
  if (['i', 'd'].indexOf(logLevel) > -1)
    gutil.log(gutil.colors.green('[INF] '), params);
};
exports.d = function (params) {
  if (['d'].indexOf(logLevel) > -1)
    gutil.log(gutil.colors.blue('[DBG] '), params);
};
exports.setLogLevel = function (level) {
  logLevel = level;
};
'use strict';

var gutil = require('gulp-util');

exports.e = function (params) {
  gutil.log(gutil.colors.red('[ERR] '), params);
};
exports.d = function (params) {
  gutil.log(gutil.colors.blue('[DBG] '), params);
};
exports.i = function (params) {
  gutil.log(gutil.colors.green('[INF] '), params);
};
exports.w = function (params) {
  gutil.log(gutil.colors.yellow('[WRN] '), params);
};

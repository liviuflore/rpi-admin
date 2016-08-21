'use strict';

var config = require('./config').config;
var log = require('./log');
var fs = require('fs');


function Cache(filename) {
  this.filename = filename;
  this.data = [];
}

Cache.prototype.Load = function () {
  try {
    this.data = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
  }
  catch (e) {
    fs.writeFile(this.filename, JSON.stringify(this.data, null, 4), function (err) {
      if (err) {
        log.e('could not write file ' + this.filename + ' [' + err + ']');
        return;
      }
    });
  }
};

Cache.prototype.Save = function () {
  fs.writeFile(this.filename, JSON.stringify(this.data, null, 4), function (err) {
    if (err) {
      log.e('could not write file ' + this.filename + ' [' + err + ']');
      return;
    }
  });
};

module.exports = Cache;

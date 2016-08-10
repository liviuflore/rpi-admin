'use strict';

var gutil = require('gulp-util');


module.exports = function (app) {
    var logger = function (req, res, next) {
        gutil.log("API req: [" + req.url + "]");
        next(); // Passing the request to the next handler in the stack.
    }
    app.use(logger);

    app.get('/', function (req, res) {
        gutil.log("debug test");
    });

    app.get('/cpustats', function (req, res) {
        gutil.log("debug test cpustats");
    });
};


var gutil = require('gulp-util');
var express = require('express');
var app = express();
var apirouter = require('./middleware/api');

app.use(function timeLog(req, res, next) {
    gutil.log("GET [" + req.url + "]");
    next();
});
app.use(express.static('./release'));
app.use('/api', apirouter);

app.listen(5000);
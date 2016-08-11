'use strict';

var gutil = require('gulp-util');

var express = require('express');
var router = express.Router();
router.use(function timeLog(req, res, next) {
    gutil.log("API req: [" + req.url + "]");
    next();
});

var systemRouter = require('./system');
//var osmcRouter = require('./osmc');
//var transmissionRouter = require('./transmission');
//var tvshowsRouter = require('./tvshows');
//var pimaticRouter = require('./pimatic');

router.use('/system', systemRouter);
//router.use('/osmc', osmcRouter);
//router.use('/transmission', transmissionRouter);
//router.use('/tvshows', tvshowsRouter);
//router.use('/pimatic', pimaticRouter);


module.exports = router;

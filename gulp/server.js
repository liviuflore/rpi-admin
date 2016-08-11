'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

// api middleware
var express = require('express');
var apimiddleware = express();
var apirouter = require('../middleware/api.js');
apimiddleware.use('/', apirouter);


function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
        routes = {
            '/bower_components': 'bower_components'
        };
    }

    var server = {
        baseDir: baseDir,
        routes: routes,
    };

    var middleware = [
        {
            route: "/api",
            handle: function (req, res, next) {
                apimiddleware(req, res);                // handle any requests at /api
            }
        }
    ]

    browserSync.instance = browserSync.init({
        startPath: '/',
        server: server,
        middleware: middleware,
        browser: browser,
        ghostMode: false
    });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, "google chrome");
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});


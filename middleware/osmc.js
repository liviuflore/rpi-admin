'use strict';

var config = require('./config').config;
var log = require('./log');
var cache = require('./cache');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

var xbmcconfig = {
  host: config.xbmc.host,
  port: config.xbmc.port,
};

var SimpleXBMC = require('simple-xbmc');
var xbmc = new SimpleXBMC(xbmcconfig.host, xbmcconfig.port);
//xbmc.videoLibrary.getRecentlyAddedEpisodes({ "limits": { "start": 0, "end": 5 }, "properties": ["title", "showtitle", "tvshowid"] }, function (response) {
//  log.d(response);
//});


router.get('/stats', function (req, res) {
  log.d("xbmc getRecentlyAddedEpisodes");
  xbmc.videoLibrary.getRecentlyAddedEpisodes({ "properties": ["title", "showtitle", "tvshowid"] }, function (response) {
    log.d(response);
  });

    //transmission.sessionStats(function (err, result) {
    //    if (err) {
    //        log.e(err);
    //        res.json({ 'result': 'ERROR' });
    //    } else {
    //        res.json(result);
    //    }
    //});
  res.json({ 'result': 'OK' });
});


module.exports = router;

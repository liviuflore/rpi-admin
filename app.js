var express = require('express');
var app = express();
var apirouter = require('../middleware/api.js');

app.use(function timeLog(req, res, next) {
    console.log("[" + Date.now() + "] " + req.url);
    next();
});
app.use(express.static('../release'));
app.use('/api', apirouter);

app.listen(5000);
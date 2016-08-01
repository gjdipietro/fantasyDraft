'use strict';

// Dependencies
var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 1337;

// Express Middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
  res.sendFile('./public/index.html');
})

app.use(function (req, res, next) {
  next();
});

// Start Server
app.listen(port);

"use strict";

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codeial_db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting in DB'));
db.once('open', function () {
  console.log("succeesfully connected MongoDB");
});
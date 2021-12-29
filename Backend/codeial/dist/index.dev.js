"use strict";

var express = require('express');

var app = express();
var port = 4444;

var expressLayouts = require('express-ejs-layouts');

app.use(express["static"]('./assets'));
app.use(expressLayouts); //To Use Routers separately

app.use('/', require('./routes')); //To set views engine

app.set('view engine', 'ejs');
app.set('views', './views'); //To check server is coonected or not

app.listen(port, function (err) {
  if (err) {
    console.log("Error running in the server ".concat(err));
  }

  console.log("Server is running on port: ".concat(port));
});
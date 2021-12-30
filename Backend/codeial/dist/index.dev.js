"use strict";

var express = require('express');

var cookieParser = require('cookie-parser');

var app = express();
var port = 4444;

var expressLayouts = require('express-ejs-layouts');

var db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser()); //Static files

app.use(express["static"]('./assets')); //To use in head and footer separately

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
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
"use strict";

var express = require('express');

var router = express.Router(); //Adding controller

var homeController = require('../controllers/home_controller');

console.log('Router is loaded ..');
router.get('/', homeController.home);
router.get('/sign', homeController.sign);
module.exports = router;
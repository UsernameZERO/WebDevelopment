"use strict";

var express = require('express');

var router = express.Router(); //Adding controller

var homeController = require('../controllers/home_controller');

console.log('Router is loaded ..');
router.get('/', homeController.home); //For any further routes access from here

router.use('/users', require('./users')); //For posts

router.use('/posts', require('./posts'));
module.exports = router;
"use strict";

var express = require('express');

var router = express.Router();

var usersController = require('../controllers/user_controller');

router.get('/profile', usersController.profile);
module.exports = router;
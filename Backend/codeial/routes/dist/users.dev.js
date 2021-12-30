"use strict";

var express = require('express');

var router = express.Router();

var usersController = require('../controllers/user_controller');

router.get('/profile', usersController.profile);
router.get('/signup', usersController.signUp);
router.get('/login', usersController.login);
router.post('/create-signup', usersController.create_signup); // router.post('/create-signin',);

module.exports = router;
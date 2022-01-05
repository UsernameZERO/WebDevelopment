"use strict";

var express = require('express');

var router = express.Router();

var passport = require('passport');

var usersController = require('../controllers/user_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/signup', usersController.signUp);
router.get('/login', usersController.login);
router.post('/create-signup', usersController.create_signup); //Use passport as a middleware to authenticate

router.post('/create-signin', passport.authenticate('local', {
  failureRedirect: '/users/login'
}), usersController.create_signin);
module.exports = router;
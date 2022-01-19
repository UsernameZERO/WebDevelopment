"use strict";

var express = require('express');

var router = express.Router();

var passport = require('passport');

var postController = require('../controllers/post_controller');

router.post('/create', passport.checkAuthentication, postController.create);
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);
module.exports = router;
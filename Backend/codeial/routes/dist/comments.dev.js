"use strict";

var express = require('express');

var router = express.Router();

var passport = require('passport');

var commentsController = require('../controllers/comment_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroyc);
module.exports = router;
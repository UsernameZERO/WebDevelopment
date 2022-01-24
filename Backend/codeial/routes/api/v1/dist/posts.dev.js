"use strict";

var express = require('express');

var router = express.Router();

var passport = require('passport');

var postApi = require('../../../controllers/api/v1/posts_api');

router.get('/', postApi.index);
router["delete"]('/:id', passport.authenticate('jwt', {
  session: false
}), postApi.destroy);
module.exports = router;
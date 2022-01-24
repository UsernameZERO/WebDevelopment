"use strict";

var express = require('express');

var router = express.Router();
router.use('/v1', require('./v1/posts_api.js'));
module.exports = router;
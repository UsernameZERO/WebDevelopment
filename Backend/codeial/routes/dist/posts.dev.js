"use strict";

var express = require('express');

var router = express.Router();

var postController = require('../controllers/post_controller');

router.post('/create', postController.create);
module.exports = router;
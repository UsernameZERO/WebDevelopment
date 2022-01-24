"use strict";

var express = require('express');

var router = express.Router();

var usersApi = require('../../../controllers/api/v1/users_api');

router.post('/create-signin', usersApi.create_signin);
module.exports = router;
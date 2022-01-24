"use strict";

var express = require('express');

var router = express.Router();

var taskApi = require('../../../controllers/api/v2/tasks_api');

router.get('/', taskApi.tasks);
module.exports = router;
const express = require('express');
const router = express.Router();
const taskApi = require('../../../controllers/api/v2/tasks_api');

router.get('/',taskApi.tasks);

module.exports = router;

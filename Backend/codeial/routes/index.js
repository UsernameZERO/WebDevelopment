const express = require('express');
const router = express.Router();

//Adding controller
const homeController = require('../controllers/home_controller');

console.log('Router is loaded ..');


router.get('/',homeController.home);

router.get('/sign',homeController.sign);

module.exports = router;
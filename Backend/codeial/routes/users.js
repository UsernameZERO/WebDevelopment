const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user_controller');

router.get('/profile',usersController.profile);

router.get('/signup',usersController.signUp);
router.get('/login',usersController.login);
router.post('/create-signup',usersController.create_signup);
// router.post('/create-signin',);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')



router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;


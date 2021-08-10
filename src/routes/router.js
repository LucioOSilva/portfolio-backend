const express = require('express');
const LoginController = require('../controllers/LoginController');
const EmailController = require('../controllers/EmailController');

const router = express.Router();

router.use('/login', LoginController);
router.use('/email', EmailController);

module.exports = router;

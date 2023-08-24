const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
//Routes for main examples: landing page, login/register
router.post('/register', homeController.createUser);

module.exports = router;
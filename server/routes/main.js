const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { ensureLoggedIn } = require('../middleware/authorization');

//Routes for main examples: landing page, login/register
router.post('/register', homeController.createUser);
router.get('/user/getInfo/:userId', ensureLoggedIn, homeController.getUserInfo);
router.get('/editUser/:id', ensureLoggedIn, homeController.getUserProfile);
router.patch('/editUser/:id', ensureLoggedIn, homeController.updateUserProfile);

module.exports = router;
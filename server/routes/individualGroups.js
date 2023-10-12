const express = require('express');
const router = express.Router();
const individualGroupController = require('../controllers/individualGroupController');
const { ensureLoggedIn } = require('../middleware/authorization');


//Routes for individual groups
router.get('/', ensureLoggedIn, individualGroupController.getIndividualGroup);
router.get('/getAll', ensureLoggedIn, individualGroupController.getAllGroup);
router.get('/checkUser', ensureLoggedIn, individualGroupController.checkUserGroup);
router.post('/create', ensureLoggedIn, individualGroupController.createGroup);
router.post('/join', ensureLoggedIn, individualGroupController.joinGroup);
router.patch('/edit', ensureLoggedIn, individualGroupController.editGroup);
router.delete('/delete', ensureLoggedIn, individualGroupController.deleteGroup);


module.exports = router;
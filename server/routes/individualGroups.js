const express = require('express');
const router = express.Router();
const individualGroupController = require('../controllers/individualGroupController');
//Routes for individual groups
router.get('/', individualGroupController.getIndividualGroup);
router.get('/getAll', individualGroupController.getAllGroup);
router.get('/checkUser', individualGroupController.checkUserGroup);
router.post('/create', individualGroupController.createGroup);
router.post('/join', individualGroupController.joinGroup);
router.patch('/edit', individualGroupController.editGroup);
router.delete('/delete', individualGroupController.deleteGroup);


module.exports = router;
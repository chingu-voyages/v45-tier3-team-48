const express = require('express');
const router = express.Router();
const individualGroupController = require('../controllers/individualGroupController');
//Routes for individual groups
router.get('/', individualGroupController.getIndividualGroup);

module.exports = router;
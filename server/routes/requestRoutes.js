const express = require('express');
const router = express.Router();
const RequestController = require('../controllers/requestController');

// routes for requests
router.get('/:groupId/getall', RequestController.findAllRequestsForOneGroup);
router.post('/create', RequestController.createNewRequest);

module.exports = router;

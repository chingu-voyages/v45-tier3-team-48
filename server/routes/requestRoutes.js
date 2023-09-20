const express = require('express');
const router = express.Router();
const RequestController = require('../controllers/requestController');

// routes for requests
router.get('/:groupId/getall', RequestController.findAllRequestsForOneGroup);
router.get('/:requestId', RequestController.findOneRequest);
router.post('/create', RequestController.createNewRequest);
router.put('/edit/:requestId', RequestController.updateOneRequest);
router.delete('/delete/:requestId', RequestController.deleteOneRequest);

module.exports = router;

const express = require('express');
const router = express.Router();
const RequestController = require('../controllers/requestController');
const { ensureLoggedIn } = require('../middleware/authorization');

// routes for requests
router.get('/:groupId/getall', ensureLoggedIn, ensureLoggedIn, RequestController.findAllRequestsForOneGroup);
router.get('/:requestId', ensureLoggedIn, RequestController.findOneRequest);
router.post('/create', ensureLoggedIn, RequestController.createNewRequest);
router.put('/edit/:requestId', ensureLoggedIn, RequestController.updateOneRequest);
router.delete('/delete/:requestId', ensureLoggedIn, RequestController.deleteOneRequest);

module.exports = router;

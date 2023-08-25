const express = require('express');
const router = express.Router();
const dashBoardController = require('../controllers/dashBoardController');
//Routes for dashboard
router.get('/', dashBoardController.getDashBoard);

module.exports = router;
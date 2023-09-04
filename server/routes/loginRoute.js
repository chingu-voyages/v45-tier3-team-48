const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/login', loginController.loginUser);


// router.post('/login', function(req,res){
//   console.log('in BE login route');

//   return res.json({test: 'in login route'});

// });

module.exports = router;
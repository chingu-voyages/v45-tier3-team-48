const users = require('../models/userModel');
// const Login = require('../models/loginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/database');

module.exports = {
    // handle the 
    loginUser: async (req, res) => {
        try {

            const { email, password } = req.body;
            
            const user = await users.find({ email });

            // if user not found, throw error
            if(!user[0]) {
                throw Error('Invalid email and/or password');;
            }

            // verify if password candidate matches encrypted password
            const passwordValid = await bcrypt.compare(password, user[0].password);

            if(!passwordValid){
                throw Error('Invalid email and/or password');
            }
            
            const token = jwt.sign({id:user.id, fullName:user.fullName, email:user.email},SECRET_KEY);
            return res.status(201).json({id:user[0].id, fullName:user[0].fullName, email:user[0].email, token, groupInfo:user[0].groupInfo, status: 201});

        } catch (err) {
            return res.json({'error': {message: err.message, status: 401}});
        }
    }
};
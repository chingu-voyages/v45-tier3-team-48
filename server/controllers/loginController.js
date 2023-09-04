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
            

            // what call should this be to the database
            // compare database
            const user = await users.find({ email });

            if(!user[0]) {
              return res.status('401').json({message: 'Invalid email and/or password'});
            }

            // create hashedPassword
            // const saltRounds = 10; 
            const passwordValid = await bcrypt.compare(password, user[0].password);

            if(!passwordValid){
                return res.status('401').json({message: 'Invalid email and/or password'});
            }
            

            const token = jwt.sign({id:user.id, fullName:user.fullName, email:user.email},SECRET_KEY);
            return res.status(201).json({id:user[0].id, fullName:user[0].fullName, email:user[0].email, token});

        } catch (err) {
            console.error(err);
        }
    }
};
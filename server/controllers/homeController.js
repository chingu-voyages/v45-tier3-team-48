const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/database');

module.exports = {
    createUser: async (req, res) => {
        try {
            console.log('Database running');
            const {fullName, phoneNumber, email, password} = req.body;
            //Check if user already exists
            const existingUser = await users.findOne({ email });
            if(existingUser) { //Code execution stops if there is an existing user.
                return res.status(401).send('User alrady exists with this email.');
            }


            const saltRounds = 10; 
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            const user = await users.create({
                fullName: fullName,
                phoneNumber: phoneNumber,
                email: email,
                password: hashedPassword
            })

            // create token by sign data to return (payload) with the secret key
            // TO DO: update with return object from the database

            if(!user) throw new Error('Could not create new user');

            console.log('User info has been added to the database!');
            //Creating json web token 
            let token = jwt.sign(
                {id: user._id, email: user.email},
                SECRET_KEY
            );
            console.log('Generated token:', token);
            user.token = token;
            user.password = undefined;
            res.status(201).json({user});

        } catch (err) {
            console.error(err);
        }
    },
    getUserInfo: async (req, res) => {
        users.findById(req.params.userId)
        .then(returnedUser => res.json(returnedUser))
        .catch(err => res.status(400).json(err));
    }
};
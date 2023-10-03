const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/database');
const ObjectId = require('mongodb').ObjectId;

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
                password: hashedPassword,
                groupInfo: []
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

            res.status(201).json({user, status: 201});

        } catch (err) {
            console.error(err);
        }
    },
    getUserInfo: async (req, res) => {
        users.findById(req.params.userId)
        .then(returnedUser => res.json(returnedUser))
        .catch(err => res.status(400).json(err));
    },
    getUserProfile: async (req,res) => {
        try {
            // extract the username from the url 
            const id = req.params.id;

            // set up user id query 
            const query = {_id: new ObjectId(id)};

            // exclude password field in query
            const user = await users.findOne(query,{password:0});


            return res.json(user);
        } catch (error) {
            console.log(error);
            res.status(400).json({error: "Could not find user data"});
        }
    },
    updateUserProfile: async (req,res) => {
        try {
            // make db call to update the record
            const id = req.params.id;
            // const id = Number(req.params.id);
            const { fullName, phoneNumber, email, password} = req.body;

            const filter = {_id: new ObjectId(id)};
            // confirm password is valid


            // retrieve user password to compare with submitted password candidate
            const user = await users.findOne(filter);

            if(!user) throw Error('User does not exist in database');
            // user may not be found

            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if(!isPasswordMatch){
                throw Error('Incorrect email/password combination');
            }


            // change this to id
            const updateData = {$set: {fullName, phoneNumber, email}}

            const updateRes = await users.updateOne(filter, updateData);

            // if nothing updated, set error
            if(updateRes.modifiedCount === 0) throw new Error('Invalid input. User does not exist.');

            return res.json(updateRes);
        } catch (error) {
            // return;
            return res.status(400).json({error: error.message});
        }
    }
};
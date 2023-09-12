const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/database');
const ObjectId = require('mongodb').ObjectId;


module.exports = {
    createUser: async (req, res) => {
        try {
            console.log('Database running');
            const saltRounds = 10; 
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            const response = await users.create({
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                password: hashedPassword 
            });


            console.log('User info has been added to the database!');

            // create token by sign data to return (payload) with the secret key
            // TO DO: update with return object from the database

            if(!response) throw new Error('Could not create new user');

            let token = jwt.sign({id:'id',username:'user'},SECRET_KEY);
            return res.status(201).json({id:'id',token});

        } catch (err) {
            console.error(err);
        }
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
    }
};
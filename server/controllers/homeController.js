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
    },
    updateUserProfile: async (req,res) => {
        try {
            // make db call to update the record
            const id = req.params.id;
            // const id = Number(req.params.id);
            const { fullName, phoneNumber, email } = req.body;

            // only update if the password is a match

            // change this to id
            const filter = {_id: new ObjectId(id)};
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
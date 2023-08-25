const users = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = {
    createUser: async (req, res) => {
        try {
            console.log('Database running');
            const saltRounds = 10; 
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            const reponse = await users.create({
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                password: hashedPassword 
            });

            console.log('User info has been added to the database!');
        } catch (err) {
            console.error(err);
        }
    }
};
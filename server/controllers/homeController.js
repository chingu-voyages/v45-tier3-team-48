const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/database');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');


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
            console.log('Before multer upload');
            console.log('Request Body:', req.body);
            console.log('Request Files:', req.files);

            upload.single('profileImg'), async (req, res) => {
                try {
                  const result = await cloudinary.uploader.upload(req.file.path); // Upload image to Cloudinary
              
                  // You can save the Cloudinary URL in your database for future retrieval
                  const imageUrl = result.secure_url;
                  
                  res.json({ imageUrl });

                  const user = await users.create({
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    email: email,
                    password: hashedPassword,
                    petImg: imageUrl
                })

                //Creating json web token 
                let token = jwt.sign(
                    {id: user._id, email: user.email},
                    SECRET_KEY
                );
                console.log('Generated token:', token);
                user.token = token;
                user.password = undefined;
                if(!user) throw new Error('Could not create new user');
                res.status(201).json({user});
                
                } catch (error) {
                  console.error(error);
                  res.status(500).json({ message: 'Server Error' });
                }
            }
            /*upload.single('profileImg')(req,res,async (err) => {
                if(err){
                    console.error(err);
                    res.status(401);
                } else {
                    try {
                        // Upload the file to Cloudinary
                        console.log('After multer upload');
                        console.log(req.file)
                        const result = await cloudinary.uploader.upload(req.file.path);
                        const imageUrl = result.secure_url;

                        const user = await users.create({
                            fullName: fullName,
                            phoneNumber: phoneNumber,
                            email: email,
                            password: hashedPassword,
                            petImg: imageUrl
                        })

                        //Creating json web token 
                        let token = jwt.sign(
                            {id: user._id, email: user.email},
                            SECRET_KEY
                        );
                        console.log('Generated token:', token);
                        user.token = token;
                        user.password = undefined;
                        if(!user) throw new Error('Could not create new user');
                        res.status(201).json({user});
                    } catch(err) {
                        console.error(err)
                        res.status(401)
                    }
                }
            })*/


            // create token by sign data to return (payload) with the secret key
            // TO DO: update with return object from the database


            console.log('User info has been added to the database!');

        } catch (err) {
            console.error(err);
        }
    }
};
//Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const mainRoutes = require('./routes/main');
const dashBoardRoutes = require('./routes/dashBoard');
const individualGroupRoutes = require('./routes/individualGroups');
const connectDB = require('./config/database');

require('dotenv').config({path: './config/.env'});

//Connection to database
connectDB();

//Middleware 
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// logs http requests and provide visibility
app.use(morgan("tiny"));

// validate user token and add data from payload to request
app.use(authenticateJWT);


//Routes 
app.use('/', mainRoutes);
app.use('/dashboard', dashBoardRoutes);
app.use('/individualGroups', individualGroupRoutes);

app.listen(5000, ()=> {
    console.log(`Listening to PORT: 5000`)
});

module.exports = app;

//When starting server first do npm init and then npm install to install node modules and then the dependencies in your folder
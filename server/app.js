//Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const mainRoutes = require('./routes/main');
const dashBoardRoutes = require('./routes/dashBoard');
const individualGroupRoutes = require('./routes/individualGroups');
const { connectDB } = require('./config/database');
const morgan = require('morgan');
const { authenticateJWT } = require('./middleware/authorization');
const requestRoutes = require('./routes/requestRoutes');

require('dotenv').config({ path: './config/.env' });

//Connection to database
connectDB();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// logs http requests and provide visibility
app.use(morgan('tiny'));

// validate user token and add data from payload to request
app.use(authenticateJWT);

//Routes
app.use('/', mainRoutes);
app.use('/dashboard', dashBoardRoutes);
app.use('/individualGroups', individualGroupRoutes);
app.use('/requests', requestRoutes);

module.exports = app;

//When starting server first do npm init and then npm install to install node modules and then the dependencies in your folder

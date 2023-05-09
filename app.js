const express = require('express');
const bodyParser = require('body-parser');
const bookingController = require('./Routes/routes');

const appServer = express();

appServer.use(bodyParser.json());
appServer.use(bodyParser.urlencoded({extended:true}));

appServer.use('/api',bookingController);


module.exports = appServer
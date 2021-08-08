require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require('./routes');

require('./_helpers/dbconnection');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(process.env.PORT || 3000, function(){
    console.log('listening on port ' + process.env.PORT);
});
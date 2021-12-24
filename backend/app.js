const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require("cors");

const port = 3000;
app.use(cors());
/*
*  Credentails
*  Admin - admin@test.com, 12345678
*  User - user@test.com, 12345678
* */


const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Import Routes
const eventsRoute = require('./routes/events');
const categoriesRoute = require('./routes/categories');
const locationsRoute = require('./routes/locations');
const usersRoute = require('./routes/users');

app.use('/api/events', eventsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/locations', locationsRoute);
app.use('/api/users', usersRoute)

//Routes
app.get('/', (req, res) => {
    res.send("Welcome home");
})

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("Connected to mongodb");
});

app.listen(port);
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000;
const mongodbURL = "mongodb+srv://toppersnotes:toppersnotes@cluster0.omuc7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

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

app.use('/events', eventsRoute);
app.use('/categories', categoriesRoute);
app.use('/locations', locationsRoute);

//Routes
app.get('/', (req, res) => {
    res.send("Welcome home");
})

//Connect to DB
mongoose.connect(mongodbURL, ()=>{
    console.log("Connected to mongodb");
});

app.listen(port);
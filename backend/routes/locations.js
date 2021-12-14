const express = require('express');
const router = express.Router()
const Location = require('../models/Location')

//Write code here
router.get('/', (req, res) => {
    res.send('We are on locations page');
});

module.exports = router
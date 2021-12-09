const express = require('express');
const router = express.Router()
const Category = require('../models/Category')
const User = require('../models/User')

//Write code here
router.get('/', async (req, res) => {
    res.send('We are on categories page');
});

module.exports = router
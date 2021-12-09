const express = require('express');
const router = express.Router()
const Event = require('../models/Event')
const Comment = require('../models/Comment')

//Write code here
router.get('/', async (req, res) => {
   res.send('We are on events page');
});

module.exports = router
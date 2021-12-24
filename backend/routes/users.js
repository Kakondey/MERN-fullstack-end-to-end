const express = require('express');
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "kakon-is-spiderman-is-a-secret"
//Write code here
router.post('/register', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save();
        res.status(201).send("User created.")
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/login', async (req, res) => {

    email_ = req.body.email
    password = req.body.password

    User.find({ email: email_ }).exec().then(user => {
        if (user.length <= 0) {
            return res.status(401).send("User not found!")
        } else {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(500).send(err)
                } else {
                    if (!result) {
                        return res.status(401).send("Passwords didn't match")
                    } else {
                        const token = jwt.sign({
                            email: user[0].email,
                            role: user[0].role,
                            name: user[0].name,
                            id: user[0]._id,
                        }, SECRET_KEY,
                            {
                                expiresIn: "12h"
                            })
                        res.status(200).send({
                            name: user[0].name,
                            email: user[0].email,
                            role: user[0].role,
                            token: token
                        })
                    }
                }


            })
        }
    }).catch(err => {
        return res.status(500).send(err)
    })

});
module.exports = router
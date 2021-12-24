const User = require('../models/User');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const SECRET_KEY = "kakon-is-spiderman-is-a-secret"
exports.signup = (req, res) => {
    const user = new User({
        username: req.body.user,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 6)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.send({ message: "User was registered successfully!" });
        });

    });
};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, SECRET_KEY, {
            expiresIn: 86400 // 24 hours
        });


        res.status(200).send({
            user: user.user,
            email: user.email,
            role: user.role,
            accessToken: token
        });
    });
};
const jwt = require('jsonwebtoken');
const SECRET_KEY = "kakon-is-spiderman-is-a-secret"

verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }

            next();

        });
    } catch (error) {
        return res.status(401).send('Invalid token!')
    }
}

isUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }

            if (decoded.role === 'user') {
                next();

            } else {
                return res.status(401).send({ error: "You don't have enough access rights!" })
            }
        });
    } catch (error) {
        return res.status(401).send('Invalid token!')
    }
}

isAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!" });
            }

            if (decoded.role === 'admin') {
                next();

            } else {
                return res.status(401).send({ error: "You don't have enough access rights!" })
            }

        });
    } catch (error) {
        return res.status(401).send('Invalid token!')
    }
}
const authJwt = {
    verifyToken,
    isAdmin,
    isUser
};

module.exports = authJwt;
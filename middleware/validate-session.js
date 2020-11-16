const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    //this holds the token that is pulled from the authorization header of the incoming request
    const token = req.headers.authorization;
    console.log('token --> ', token);

    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided" })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            console.log('decodeToken --> ', decodeToken);

            if (!err && decodeToken) {
                User.findOne({
                    where: { //below I am identifying a specific user by dot notation with id.
                        id: decodeToken.id
                    }
                })
                .then(user => {
                    console.log('user --> ', user);

                    if (!user) throw err;
                    console.log('req --> ', req);

                    req.user = user;
                    return next();
                })
                // next function exits us out of this function
                .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
};

module.exports = validateSession;
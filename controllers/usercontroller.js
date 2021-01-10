const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/***************
**USER SIGNUP***
****************/

router.post('/create', function (req, res) {

    User.create({
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 13)
    }).then(
        function createSuccess(user) {
// token variable will store the token
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '60d' });

            res.json({
                //left is name of object, right side is the parameter from function above
                user: user,
                message: 'User successfully created!',
                sessionToken: token
            });
        }     
    ).catch(err => res.status(500).json({ error: err }))
});

/****************
 ***USER LOGIN***
 ****************/
// findOne is a sequelize method that tries to find something within the database
// "where" is an object within sequelize that tells the database to look for something matching its properties
 router.post('/login', function (req, res) {
     User.findOne({
         where: {
             username: req.body.user.username
         }
     }).then(function loginSuccess(user) {
             if (user) {
                 bcrypt.compare(req.body.user.password, user.password, function (err, matches) 

                 {if (matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '30d' }) 
                   
                    res.status(200).json({
                    user: user,
                    message: 'User login successful!',
                    sessionToken: token
                    })  

                } else {res.status(502).send({ error: 'Login Failed'})}
                });
                }
                else { res.status(500).json({ error: 'User does not exist.'})} 
                }).catch(err => res.status(500).json({ error: err}))
 });


module.exports = router;
const router = require('express').Router();
let validateSession = require('../middleware/validate-session');
const UserInfo = require('../db').import('../models/userinfo');


/*********************
 ***USERINFO CREATE***
 *********************/
router.post('/createuserinfo', (req, res) => {
    UserInfo.create = ({
        dateOfBirth: req.body.userinfo.dateOfBirth,
        age: req.body.userinfo.age,
        heightInInches: req.body.userinfo.heightInInches,
        weightInPounds: req.body.userinfo.weightInPounds,
        goal: req.body.userinfo.goal,
        userId: req.user.id
    })
    .then(userinfo => res.status(200).json(userinfo))
    .catch(err => res.status(500).json(
        { error: err}))
})

/********************
***GET USER INFO***
**********************/

router.get('/getuserinfo', (req, res) => {
    // .findAll is a sequelize method to find all of the items
    UserInfo.findOne({
        where: { 
            userId: req.user.id
        }
    })
    .then(function createSuccess(data){
        res.status(200).json({
            message: 'User Info found',
            data: data
        })
    }).catch(err => res.status(500).json('User Info not found', err))

/*********************
***UPDATE USERINFO****
**********************/
// router.put('/userinfo/:id', validateSession, function(req, res) {
//     const updateUserInfo = {
//         dateOfBirth: req.body.userinfo.dateOfBirth,
//         age: req.body.userinfo.age,
//         heightInInches: req.body.userinfo.heightInInches,
//         weightInPounds: req.body.userinfo.weightInPounds,
//         goal: req.body.userinfo.goal,
//     };
//     const query = { where: { id: req.params.id, userId: req.user.id}};
// // update is a sequelize method
//     UserInfo.update(updateUserInfo, query)
//     .then((userinfo) => res.status(200).json(userinfo))
//     .catch((err) => res.status(500).json({ error: err }));
// })

/*************************
***DELETE ENTRY BY USER***
**************************/
router.delete("/userinfo/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id }};

    UserInfo.destroy(query)
    .then(() => res.status(200).json({ message: "Userinfo entry removed" }))
    .catch((err) => res.status(500).json({ error: err }))
})


module.exports = router;
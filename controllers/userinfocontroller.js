const router = require('express').Router();
let validateSession = require('../middleware/validate-session');
const Userinfo = require('../db').import('../models/userinfo');

router.get('/practice', validateSession, function(req, res)
    {
        res.send('Hey! This is a practice router!')
    }
)

/*********************
 ***USERINFO CREATE***
 *********************/
router.post('/userinfo', validateSession, (req, res) => {
    const userinfoEntry = {
        dateOfBirth: req.body.userinfo.dateOfBirth,
        age: req.body.userinfo.age,
        heightInInches: req.body.userinfo.heightInInches,
        weightInPounds: req.body.userinfo.weightInPounds,
        goal: req.body.userinfo.goal,
        userId: req.body.userinfo.userId,
        owner: req.user.id
    }
    Userinfo.create(userinfoEntry)
    .then(userinfo => res.status(200).json(userinfo))
    .catch(err => res.status(500).json(
        { error: err}))
})

/********************
***GET ALL ENTRIES***
**********************/

router.get("/userinfo", (req, res) => {
    // .findAll is a sequelize method to find all of the items
    Userinfo.findAll()
    .then(userinfo => res.status(200).json(userinfo))
    .catch(err => res.status(500).json({ error: err }))
});

/***********************
***GET ENTRY BY USER***
************************/

router.get('/userinfo/:id', validateSession, (req, res) => {
    let userid = req.user.id
    Userinfo.findAll({
        where: { owner: userid }
    })
    .then(userinfo => res.status(200).json(userinfo))
    .catch(err => res.status(500).json({ error: err }))
})

/*********************
***UPDATE USERINFO****
**********************/
router.put('/userinfo/:id', validateSession, function(req, res) {
    const updateUserInfo = {
        dateOfBirth: req.body.userinfo.dateOfBirth,
        age: req.body.userinfo.age,
        heightInInches: req.body.userinfo.heightInInches,
        weightInPounds: req.body.userinfo.weightInPounds,
        goal: req.body.userinfo.goal,
    };
    const query = { where: { id: req.params.id, owner: req.user.id}};
// update is a sequelize method
    Userinfo.update(updateUserInfo, query)
    .then((userinfo) => res.status(200).json(userinfo))
    .catch((err) => res.status(500).json({ error: err }));
})

/*************************
***DELETE ENTRY BY USER***
**************************/
router.delete("/userinfo/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id }};

    Userinfo.destroy(query)
    .then(() => res.status(200).json({ message: "Userinfo entry removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});



module.exports = router
const router = require('express').Router();
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');


router.get('/practice', validateSession, function(req, res)
    {
        res.send('Hey! This is a practice router!')
    }
)

/****************
 ***LOG CREATE***
 *****************/
router.post('/log', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner: req.user.id 
    }
    // create is a sequelize method that allows me to create an instance of the log model and send the logEntry object I created to the database
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err}))
})

/* ******************
***GET ALL ENTRIES***
********************* */
router.get("/log", (req, res) => {
    // .findAll is a sequelize method to find all of the items
    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});

/* ********************
***GET ENTRY BY USER***
*********************** */
router.get('/log/:id', validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: { owner: userid }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
})

/* ********************
***UPDATE LOG ENTRY****
************************/
router.put('/log/:id', validateSession, function(req, res) {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result
    };
    const query = { where: { id: req.params.id, owner: req.user.id}};
// update is a sequelize method
    Log.update(updateLogEntry, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
})

/* ***********************
***DELETE ENTRY BY USER***
***************************/
router.delete("/log/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id }};

    Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log entry removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});



module.exports = router
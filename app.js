require("dotenv").config();
let express = require('express');
let app = express();
const sequelize = require('./db');

//here I am imorting the route object and storing it in a variable called workout
const workoutlog = require('./controllers/workoutcontroller')
const user = require('./controllers/usercontroller')

//this ensures that we sync all defined models to the DB
sequelize.sync();
//sequelize.sync({force: true})

// this is a middleware function, must go above any routes!!!so the request can be jsonified and interpret body of data
app.use(express.json());

/* ****************
***EXPOSED ROUTE***
****************** */
app.use('/user', user)

/* ****************
**PROTECTED ROUTE**
******************* */
//anything below the middleware will require a token, anything above will not. This is useful for when multiple users want to see content or you want to restrict what certain users see/do
// app.use(require('./middleware/validate-session'));
app.use('/workoutlog', workoutlog)



app.listen(3000, function(){
    console.log('App is listening on port 3000');
})
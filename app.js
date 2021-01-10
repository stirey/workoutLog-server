require("dotenv").config();
let cors = require('cors')
const express = require('express');
const app = express();
const sequelize = require('./db');
const user = require('./controllers/usercontroller')
const workout = require('./controllers/workoutcontroller')
const userinfo = require('./controllers/userinfocontroller')
//this ensures that we sync all defined models to the DB
sequelize.sync();
app.use(cors());
app.use(express.json());
app.use(require('./middleware/headers'))
//here I am imorting the route object and storing it in a variable called workout


//sequelize.sync({force: true})

// this is a middleware function, must go above any routes!!!so the request can be jsonified and interpret body of data


/* ****************
***EXPOSED ROUTE***
****************** */
app.use('/user', user)

/* ****************
**PROTECTED ROUTE**
******************* */
//anything below the middleware will require a token, anything above will not. This is useful for when multiple users want to see content or you want to restrict what certain users see/do
// app.use(require('./middleware/validate-session'));
app.use('/workout', workout)
app.use('/userinfo', userinfo)

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`));
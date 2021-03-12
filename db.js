const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err=> console.log(err));
 
User = sequelize.import('./models/user');
Logs = sequelize.import('./models/log')
UserInfo = sequelize.import('./models/userinfo');


Logs.belongsTo(User);
User.hasMany(Logs);

User.hasOne(UserInfo);
UserInfo.belongsTo(User);

module.exports = sequelize;
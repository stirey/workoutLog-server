const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err=> console.log(err));
 
User = sequelize.import('./models/user');
UserInfo = sequelize.import('./models/userinfo');

User.hasOne(UserInfo);
UserInfo.belongsTo(User);

module.exports = sequelize;
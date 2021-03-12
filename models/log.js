module.exports = (sequelize, DataTypes) => {
    const WorkoutLog = sequelize.define('log', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        definition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
        }
    
    })
    return WorkoutLog;
}
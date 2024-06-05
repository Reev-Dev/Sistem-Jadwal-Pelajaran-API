module.exports = (sequelize, DataTypes) => {
    const classes = sequelize.define(
        "classes",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            className: {
                allowNull: false,
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            tableName: "classes",
        });
    classes.associate = (models) => {
        classes.hasMany(models.schedules, {
            foreignKey: 'classId'
        });
    };
    return classes;
};

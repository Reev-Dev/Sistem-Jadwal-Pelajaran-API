module.exports = (sequelize, DataTypes) => {
    const admin = sequelize.define('admin', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,

            type: DataTypes.DATE
        }
    }, {
        tableName: 'admin',
    });
    return admin;
}


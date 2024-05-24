module.exports = (sequelize, DataTypes) => {
    const subject = sequelize.define('subject', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        mapel: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        guruPengampu: {
            type: DataTypes.STRING,
            allowNull: false
        },
        kodeGuru: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        tableName: 'mapel'
    });
    return subject;
};

module.exports = (sequelize, DataTypes) => {
    const subject = sequelize.define('mapel', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        mapel: {
            type: DataTypes.STRING,
            allowNull: false
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
            type: DataTypes.DATE,
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
            onUpdate: DataTypes.literal('CURRENT_TIMESTAMP')
        }
    }, {
        tableName: 'mapel'
    });
    return subject;
};

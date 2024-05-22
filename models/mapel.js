module.exports = (sequelize, DataTypes) => {
    const mapel = sequelize.define('mapel', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        mapel: {
            type: Sequelize.STRING,
            allowNull: false
        },
        guruPengampu: {
            type: Sequelize.STRING,
            allowNull: false
        },
        kodeGuru: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        tableName: 'mapel'
    });
    return mapel;
};

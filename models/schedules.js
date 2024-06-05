module.exports = (sequelize, DataTypes) => {
    const schedules = sequelize.define(
        "schedules",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            day: {
                allowNull: false,
                type: DataTypes.STRING
            },
            time: {
                allowNull: false,
                type: DataTypes.STRING
            },
            classId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'classes',
                    key: 'id'
                }
            },
            subjectId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'subject',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            tableName: "schedules"
        });
        schedules.associate = (models) => {
            schedules.belongsTo(models.classes, {
                foreignKey: 'classId'
            });
            schedules.belongsTo(models.subject, {
                foreignKey: 'subjectId'
            });
        };
    return schedules;
};

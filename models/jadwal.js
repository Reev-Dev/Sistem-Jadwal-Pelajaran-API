module.exports = (sequelize, DataTypes) => {
  const jadwal = sequelize.define(
    "jadwal",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      mapel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kodeGuru: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hari: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kelas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    },
    {
      tableName: "jadwal",
    }
  );
  return jadwal;
};

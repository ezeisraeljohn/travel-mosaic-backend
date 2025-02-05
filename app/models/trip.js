const { Model, DataTypes } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize) => {
  class Trip extends Model {
    static associate(models) {
      Trip.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Trip.belongsTo(models.City, {
        foreignKey: "destination",
        as: "destinationCity",
      });
    }
  }

  Trip.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => uuid.v4(),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "start_date",
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "end_date",
      },
      destination: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
    },
    {
      sequelize,
      modelName: "Trip",
      tableName: "trips",
      underscored: true,
    }
  );

  return Trip;
};

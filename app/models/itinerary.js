const { Model, DataTypes } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize) => {
  class Itinerary extends Model {
    static associate(models) {
      Itinerary.belongsTo(models.Trip, {
        foreignKey: "tripId",
        onDelete: "CASCADE",
        as: "trip",
      });
      Itinerary.belongsTo(models.Hotspot, {
        foreignKey: "hotspot",
        as: "hotspotDetails",
      });
    }
  }
  Itinerary.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuid.v4(),
      },
      tripId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "trip_id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      hotspot: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Itinerary",
      tableName: "itineraries",
      underscored: true,
    }
  );
  return Itinerary;
};

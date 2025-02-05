const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Hotspot extends Model {
    static associate(models) {
      Hotspot.belongsTo(models.HotspotCategory, {
        foreignKey: "category",
        onDelete: "CASCADE",
        as: "hotspotCategory",
      });
      Hotspot.belongsTo(models.City, {
        foreignKey: "cityId",
        onDelete: "CASCADE",
        as: "city",
      });
    }
  }
  Hotspot.init(
    {
      osmId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        field: "osm_id",
      },
      osmUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "osm_url",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL(10, 8),
      },
      lng: {
        type: DataTypes.DECIMAL(11, 8),
      },
      address: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.DECIMAL(2, 1),
      },
      num_reviews: {
        type: DataTypes.INTEGER,
      },
      hours: {
        type: DataTypes.JSONB,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      tags: {
        type: DataTypes.JSONB,
      },
    },
    {
      sequelize,
      modelName: "Hotspot",
      tableName: "hotspots",
      underscored: true,
      timestamps: true,
    }
  );
  return Hotspot;
};

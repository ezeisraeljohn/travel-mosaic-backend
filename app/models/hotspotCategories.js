const { Model, DataTypes } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize) => {
  class HotspotCategory extends Model {
    static associate(models) {
      HotspotCategory.hasMany(models.Hotspot, {
        foreignKey: "category",
        onDelete: "CASCADE",
        as: "hotspots",
      });
    }
  }
  HotspotCategory.init(
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => uuid.v4(),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "HotspotCategory",
      tableName: "hotspot_categories",
      underscored: true,
      timestamps: true,
    }
  );
  return HotspotCategory;
};

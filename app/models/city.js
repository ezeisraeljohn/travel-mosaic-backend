const { Model, DataTypes } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize) => {
  class City extends Model {
    static associate(models) {
      City.belongsTo(models.Country, {
        foreignKey: "countryId",
        onDelete: "CASCADE",
        as: "country",
      });
      City.hasMany(models.Hotspot, {
        foreignKey: "cityId",
        onDelete: "CASCADE",
        as: "hotspots",
      });
    }
  }
  City.init(
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
      countryId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "country_id",
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stateCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "state_code",
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
      },
    },
    {
      sequelize,
      modelName: "City",
      tableName: "cities",
      underscored: true,
      timestamps: true,
    }
  );
  return City;
};

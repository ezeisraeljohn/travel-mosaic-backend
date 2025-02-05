const { Model, DataTypes } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize) => {
  class Country extends Model {
    static associate(models) {
      Country.hasMany(models.City, {
        foreignKey: "country",
        onDelete: "CASCADE",
        as: "cities",
      });
    }
  }
  Country.init(
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
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Country",
      tableName: "countries",
      underscored: true,
      timestamps: true,
    }
  );
  return Country;
};

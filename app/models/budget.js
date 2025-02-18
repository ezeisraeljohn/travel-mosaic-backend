const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Budget extends Model {
    static associate(models) {
      Budget.belongsTo(models.Trip, {
        foreignKey: "tripId",
        onDelete: "CASCADE",
      });
    }
  }
  Budget.init(
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      tripId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "trip_id",
      },
      totalBudget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "total_budget",
      },
      spent: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      modelName: "Budget",
      tableName: "budgets",
      underscored: true,
      timestamps: true,
    }
  );
  return Budget;
};

const { Model, DataTypes } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize) => {
  class FederatedCredential extends Model {
    static associate(models) {
      FederatedCredential.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "user",
      });
    }
  }
  FederatedCredential.init(
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => uuid.v4(),
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      providerId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "provider_id",
      },
    },
    {
      sequelize,
      modelName: "FederatedCredential",
      tableName: "federated_credentials",
      underscored: true,
      timestamps: true,
    }
  );
  return FederatedCredential;
};

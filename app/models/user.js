const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define associations here if needed in the future
      User.hasMany(models.FederatedCredential, {
        foreignKey: "userId",
        as: "federatedCredentials",
      });
    }
  }
  User.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "first_name",
        defaultValue: "", //Prevent null issues if left blank
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "last_name",
        defaultValue: "", // Prevent null issues if left blank
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure unique constraint is enforced
        validate: {
          isEmail: true, // Validate email format
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true, // Maps camelCase to snake_case in DB
      paranoid: true, // Enables soft deletes using `deleted_at`
      timestamps: true, // Enables `created_at` and `updated_at`
    }
  );
  return User;
};

const { Model, DataTypes } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.FederatedCredential, {
        foreignKey: "userId",
        as: "federatedCredentials",
      });
      User.hasMany(models.QuestionnaireResponse, {
        foreignKey: "userId",
        as: "questionnaireResponses",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuid.v4(),
      }, // Generate UUIDs by default
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
        allowNull: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "profile_picture",
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_email_verified",
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

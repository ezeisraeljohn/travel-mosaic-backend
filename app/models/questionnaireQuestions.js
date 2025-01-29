const { Model, DataTypes } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize) => {
  class QuestionnaireQuestion extends Model {
    static associate(models) {
      QuestionnaireQuestion.hasMany(models.QuestionnaireOption, {
        foreignKey: "questionId",
        onDelete: "CASCADE",
        as: "options",
      });
      QuestionnaireQuestion.hasMany(models.QuestionnaireResponse, {
        foreignKey: "questionId",
        onDelete: "CASCADE",
        as: "responses",
      });
    }
  }
  QuestionnaireQuestion.init(
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => uuid.v4(),
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "QuestionnaireQuestion",
      tableName: "questionnaire_questions",
      underscored: true,
      timestamps: true,
    }
  );
  return QuestionnaireQuestion;
};

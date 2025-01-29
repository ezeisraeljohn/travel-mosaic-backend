const { Model, DataTypes } = require("sequelize");

const uuid = require("uuid");

module.exports = (sequelize) => {
  class QuestionnaireOption extends Model {
    static associate(models) {
      QuestionnaireOption.belongsTo(models.QuestionnaireQuestion, {
        foreignKey: "questionId",
        onDelete: "CASCADE",
        as: "questionnaireQuestion",
      });
    }
  }
  QuestionnaireOption.init(
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => uuid.v4(),
      },
      questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "question_id",
      },
      option: {
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
      modelName: "QuestionnaireOption",
      tableName: "questionnaire_options",
      underscored: true,
      timestamps: true,
    }
  );
  return QuestionnaireOption;
};

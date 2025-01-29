const { Model, DataTypes } = require("sequelize");

const uuid = require("uuid");

module.exports = (sequelize) => {
  class QuestionnaireResponse extends Model {
    static associate(models) {
      QuestionnaireResponse.belongsTo(models.Questionnaire, {
        foreignKey: "questionId",
        onDelete: "CASCADE",
        as: "questionnaire",
      });
    }
  }
  QuestionnaireResponse.init(
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
      optionId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "option_id",
      },
      questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "question_id",
      },
      isSkipped: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "QuestionnaireResponse",
      tableName: "questionnaire_responses",
      underscored: true,
      timestamps: true,
    }
  );
  return QuestionnaireResponse;
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("questionnaire_responses", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        field: "user_id",
      },
      questionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "questionnaire_questions",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        field: "question_id",
      },
      optionId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "questionnaire_options",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        field: "option_id",
      },
      isSkipped: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: "is_skipped",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        field: "updated_at",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("questionnaire_responses");
  },
};

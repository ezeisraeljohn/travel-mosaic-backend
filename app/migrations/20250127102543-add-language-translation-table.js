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
    await queryInterface.createTable("language_translations", {
      id: {
        type: Sequelize.UUID,
      },
      trip_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "trips",
          key: "id",
        },
      },
      source_language: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      target_language: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phrase: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      translation: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
    await queryInterface.dropTable("language_translations");
  },
};

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
    await queryInterface.createTable("transportations", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      trip_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "trips",
          key: "id",
        },
      },
      type: {
        type: Sequelize.ENUM("flight", "train", "car"),
        allowNull: false,
      },
      provider: {
        type: Sequelize.STRING,
      },
      departure_date: {
        type: Sequelize.DATE,
      },
      arrival_date: {
        type: Sequelize.DATE,
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
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
    await queryInterface.dropTable("transportations");
  },
};

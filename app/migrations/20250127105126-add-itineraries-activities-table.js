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
    await queryInterface.createTable("itinerary_activities", {
      id: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      itineraryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "itineraries",
          key: "id",
        },
        field: "itinerary_id",
      },
      name: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      description: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false,
        field: "start_time",
      },
      endTime: {
        type: Sequelize.TIME,
        allowNull: false,
        field: "end_time",
      },
      cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
    await queryInterface.dropTable("itinerary_activities");
  },
};

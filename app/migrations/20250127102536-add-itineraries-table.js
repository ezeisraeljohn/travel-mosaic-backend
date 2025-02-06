("use strict");

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("itineraries", {
      id: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      tripId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "trips",
          key: "id",
        },
        field: "trip_id",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hotspots: {
        type: Sequelize.ARRAY(DataTypes.UUID),
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable("itineraries");
  },
};

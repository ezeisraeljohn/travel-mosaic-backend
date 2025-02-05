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
    await queryInterface.createTable("cities", {
      id: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "countries",
          key: "id",
        },
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stateCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      latitiude: {
        type: Sequelize.DECIMAL(10, 8),
      },
      latitude: {
        type: Sequelize.DECIMAL(11, 8),
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
    await queryInterface.dropTable("cities");
  },
};

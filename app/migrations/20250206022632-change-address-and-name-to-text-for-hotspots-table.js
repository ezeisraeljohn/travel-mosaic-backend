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
    await queryInterface.changeColumn("hotspots", "address", {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn("hotspots", "name", {
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("hotspots", "address", {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn("hotspots", "name", {
      type: Sequelize.STRING,
    });
  },
};

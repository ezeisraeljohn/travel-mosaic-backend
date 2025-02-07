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
    await queryInterface.changeColumn("itineraries", "name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("itineraries", "hotspots", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.renameColumn("itineraries", "hotspots", "hotspot");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("itineraries", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("itineraries", "hotspot", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.renameColumn("itineraries", "hotspot", "hotspots");
  },
};

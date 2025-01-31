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
    await queryInterface.removeColumn("hotspots", "id");
    await queryInterface.renameColumn("hotspots", "foursquare_id", "osm_id");
    await queryInterface.renameColumn("hotspots", "foursquare_url", "osm_url");
    await queryInterface.changeColumn("hotspots", "osm_id", {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn("hotspots", "id", {
      type: Sequelize.UUID,
      unique: true,
      allowNull: false,
      primaryKey: true,
    });
    await queryInterface.renameColumn("hotspots", "osm_id", "foursquare_id");
    await queryInterface.renameColumn("hotspots", "osm_url", "foursquare_url");
    await queryInterface.changeColumn("hotspots", "foursquare_id", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },
};

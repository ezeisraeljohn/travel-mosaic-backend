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
    await queryInterface.createTable("hotspots", {
      id: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      foursquare_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "hotspot_categories",
          key: "id",
        },
      },
      lat: {
        type: Sequelize.DECIMAL(10, 8),
      },
      lng: {
        type: Sequelize.DECIMAL(11, 8),
      },
      address: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.DECIMAL(2, 1),
      },
      num_reviews: {
        type: Sequelize.INTEGER,
      },
      foursquare_url: {
        type: Sequelize.STRING,
      },
      hours: {
        type: Sequelize.JSONB,
      },
      price: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("hotspots");
  },
};

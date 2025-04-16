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
      osm_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.TEXT,
      },
      category: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      lat: {
        type: Sequelize.DECIMAL(11, 8),
      },
      lng: {
        type: Sequelize.DECIMAL(11, 8),
      },
      address: {
        type: Sequelize.TEXT,
      },
      rating: {
        type: Sequelize.DECIMAL(2, 1),
      },
      num_reviews: {
        type: Sequelize.INTEGER,
      },
      review: {
        type: Sequelize.TEXT,
      },
      osm_url: {
        type: Sequelize.STRING,
      },
      hours: {
        type: Sequelize.JSONB,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.TEXT,
      },
      description: { type: Sequelize.TEXT },
      tags: {
        type: Sequelize.TEXT,
      },
      city_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
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

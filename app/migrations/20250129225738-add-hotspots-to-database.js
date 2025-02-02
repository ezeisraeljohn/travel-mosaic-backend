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
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
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
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.JSONB,
      },
      city_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "cities",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable("hotspots");
  },
};

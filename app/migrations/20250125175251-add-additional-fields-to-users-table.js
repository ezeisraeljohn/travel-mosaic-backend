"use strict";

const { query } = require("express");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "username", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
    await queryInterface.addColumn("users", "is_active", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
    await queryInterface.addColumn("users", "profile_picture", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("users", "signup_method", {
      type: Sequelize.ENUM("email", "google", "apple"),
      defaultValue: "email",
    });
    await queryInterface.addColumn("users", "travel_preferences", {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.addColumn("users", "personality_traits", {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "username");
    await queryInterface.removeColumn("users", "is_active");
    await queryInterface.removeColumn("users", "profile_picture");
    await queryInterface.removeColumn("users", "signup_method");
    await queryInterface.removeColumn("users", "travel_preferences");
    await queryInterface.removeColumn("users", "personality_traits");
  },
};

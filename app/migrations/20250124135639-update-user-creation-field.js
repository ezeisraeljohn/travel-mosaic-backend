"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("users", "firstName", "first_name");
    await queryInterface.renameColumn("users", "lastName", "last_name");
    await queryInterface.renameColumn("users", "createdAt", "created_at");
    await queryInterface.renameColumn("users", "updatedAt", "updated_at");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("users", "first_name", "firstName");
    await queryInterface.renameColumn("users", "last_name", "lastName");
    await queryInterface.renameColumn("users", "created_at", "createdAt");
    await queryInterface.renameColumn("users", "updated_at", "updatedAt");
  },
};

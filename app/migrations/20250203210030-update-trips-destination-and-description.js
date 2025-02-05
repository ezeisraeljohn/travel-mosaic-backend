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
    await queryInterface.changeColumn("trips", "destination", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "cities",
        key: "id",
      },
    });
    await queryInterface.addColumn("trips", "name", {
      type: Sequelize.STRING,
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
    await queryInterface.removeColumn("trips", "description");
    await queryInterface.changeColumn("trips", "destination", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.removeColumn("trips", "name");
  },
};

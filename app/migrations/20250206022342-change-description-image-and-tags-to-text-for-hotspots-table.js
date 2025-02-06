module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("hotspots", "description", {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn("hotspots", "tags", {
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn("hotspots", "image", {
      type: Sequelize.TEXT,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("hotspots", "description", {
      type: Sequelize.STRING(255),
    });
    await queryInterface.changeColumn("hotspots", "tags", {
      type: Sequelize.STRING(255),
    });
    await queryInterface.changeColumn("hotspots", "image", {
      type: Sequelize.STRING(255),
    });
  },
};

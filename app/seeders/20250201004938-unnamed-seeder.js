"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Example of how to update an existing category's value
    await queryInterface.bulkUpdate(
      "hotspot_categories", // Name of the table you're updating
      {
        value:
          "tourism=attraction|tourism=picnic_site|tourism=viewpoint|tourism=camp_site", // New value
      },
      {
        id: "ec870308-4c00-4b63-807e-36ceb54d185d", // Condition to find the record to update
      }
    );
  },

  async down(queryInterface, Sequelize) {
    // If you want to revert the update in the down method, set the value back to the original
    await queryInterface.bulkUpdate(
      "hotspot_categories",
      {
        value:
          "tourism=attraction|tourism=picnic_site|tourism=viewpoint|tourism=camp_site|tourism=alpine_hut|leisure=park|leisure=garden|leisure=swimming_pool|leisure=stadium|leisure=fitness_station|natural=water|natural=tree|natural=wood|natural=scrub|natural=cliff|tourism=zoo|leisure=slipway|leisure=beach|tourism=theme_park",
      },
      {
        id: "ec870308-4c00-4b63-807e-36ceb54d185d",
      }
    );
  },
};

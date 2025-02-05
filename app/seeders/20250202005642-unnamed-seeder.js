"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const categories = [
      {
        id: "ec870308-4c00-4b63-807e-36ceb54d185d",
        name: "Outdoors",
        value: "tourism=attraction",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "10edfcaf-ac20-40b2-88e9-8574d5bdb803",
        name: "Food",
        value: "amenity=restaurant|amenity=cafe|amenity=fast_food",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "3a56c3c6-6229-4481-93c0-20d8f1e6bd6d",
        name: "Cultural",
        value:
          "tourism=museum|tourism=artwork|historic=monument|amenity=temple",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "f70dd5a2-784e-4f34-84c9-9c97d6395cbb",
        name: "Shopping",
        value: "shop=*",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "fd0c2ed9-811d-4aac-a71f-b285476fe867",
        name: "NightLife",
        value: "amenity=bar|amenity=wine_bar|amenity=theatre|amenity=cinema",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "fa38cf3a-9d2a-467b-ba33-32a119acee61",
        name: "Adventure",
        value:
          "tourism=amusement_park|natural=cliff|natural=hill|natural=volcano|natural=peninsula|natural=water",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkDelete("hotspot_categories", null, {});
    await queryInterface.bulkInsert("hotspot_categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("hotspot_categories", null, {});
  },
};

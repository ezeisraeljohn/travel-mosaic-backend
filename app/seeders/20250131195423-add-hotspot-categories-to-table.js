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
        value:
          "tourism=attraction|tourism=picnic_site|tourism=viewpoint|tourism=camp_site|tourism=alpine_hut|leisure=park|leisure=garden|leisure=swimming_pool|leisure=stadium|leisure=fitness_station|natural=water|natural=tree|natural=wood|natural=scrub|natural=cliff|tourism=zoo|leisure=slipway|leisure=beach|tourism=theme_park",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "10edfcaf-ac20-40b2-88e9-8574d5bdb803",
        name: "Food",
        value:
          "amenity=restaurant|amenity=cafe|amenity=fast_food|amenity=ice_cream|amenity=food_court|amenity=bar|amenity=pub|amenity=wine_bar|amenity=marketplace|amenity=greengrocer|amenity=supermarket|shop=convenience",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "3a56c3c6-6229-4481-93c0-20d8f1e6bd6d",
        name: "Cultural",
        value:
          "tourism=museum|tourism=artwork|tourism=gallery|historic=monument|historic=memorial|historic=ruins|historic=castle|historic=fort|amenity=theatre|amenity=cinema|amenity=opera|amenity=concert_hall|amenity=place_of_worship|amenity=church|amenity=mosque|amenity=temple",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "f70dd5a2-784e-4f34-84c9-9c97d6395cbb",
        name: "Shopping",
        value:
          "shop=clothes|shop=electronics|shop=supermarket|shop=convenience|shop=bookstore|shop=shopping_centre|shop=mall|amenity=marketplace|shop=hardware|shop=pharmacy|shop=pet|shop=butcher",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "fd0c2ed9-811d-4aac-a71f-b285476fe867",
        name: "NightLife",
        value:
          "amenity=bar|amenity=pub|amenity=wine_bar|amenity=nightclub|amenity=casino|amenity=dance|amenity=karaoke|amenity=theatre|amenity=cinema|amenity=concert_hall",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "fa38cf3a-9d2a-467b-ba33-32a119acee61",
        name: "Adventure",
        value:
          "leisure=park|leisure=fitness_station|leisure=sports_centre|leisure=slipway|leisure=miniature_golf|leisure=climbing|leisure=ice_rink|leisure=skating|leisure=ski_jumping|leisure=swimming_pool|tourism=camp_site|tourism=alpine_hut|tourism=adventure_camp|tourism=adventure_park|tourism=amusement_park",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
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

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
    const questionnaireOptions = [
      {
        id: "39d0d74b-7738-4043-b386-7adad46d0cb7",
        question_id: "5a84ebaf-5430-4fbb-b028-307450ec88a8",
        option: "Outdoor Activities(eg. Hiking, kayaking)",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "66e97762-4d59-4b6f-9280-649302617fac",
        question_id: "5a84ebaf-5430-4fbb-b028-307450ec88a8",
        option: "Food And Culinary Experiences",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "37979d76-7048-409c-903c-77961dbccc8a",
        question_id: "5a84ebaf-5430-4fbb-b028-307450ec88a8",
        option: "Historical And Cultural Landmarks",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "edbcb07a-b9d3-4766-997b-af31ba035f7b",
        question_id: "5a84ebaf-5430-4fbb-b028-307450ec88a8",
        option: "Nightlife And Entertainment",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "5b37806e-1efb-4cf1-b08e-e5aa002a89a7",
        question_id: "5a84ebaf-5430-4fbb-b028-307450ec88a8",
        option: "Wellness And Relaxation(eg. Spa, Yoga)",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert(
      "questionnaire_options",
      questionnaireOptions,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("questionnaire_options", null, {});
  },
};

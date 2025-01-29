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
        id: "7f8e9d1a-2b3c-4d5e-6789-abcd123456ef",
        question_id: "beadcaee-7d06-4fe8-98dc-caec1fdc383e",
        option: "Solo",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "80fd1c37-151f-4fe2-a1dd-d396d5b6a450",
        question_id: "beadcaee-7d06-4fe8-98dc-caec1fdc383e",
        option: "With A Partner",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "c06292d1-21cd-492b-a699-6c5889a9098b",
        question_id: "beadcaee-7d06-4fe8-98dc-caec1fdc383e",
        option: "With Family",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "dc94b4aa-c5b5-4975-b10e-592f85e0a79c",
        question_id: "beadcaee-7d06-4fe8-98dc-caec1fdc383e",
        option: "With Friends",
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

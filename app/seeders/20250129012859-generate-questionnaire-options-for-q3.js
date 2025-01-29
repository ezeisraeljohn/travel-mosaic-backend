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
        id: "8a1b2c3d-4e5f-6789-abcd-1234567890ab",
        question_id: "feb9aea2-c0a9-48bc-b580-7cdba5cb40bc",
        option: "Less than $500",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "1f2e3d4c-5b6a-7890-bacd-2345678901bc",
        question_id: "feb9aea2-c0a9-48bc-b580-7cdba5cb40bc",
        option: "$500 - $1500",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "3c4d5e6f-7a8b-9012-cdab-3456789012cd",
        question_id: "feb9aea2-c0a9-48bc-b580-7cdba5cb40bc",
        option: "$1500 - $3000",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "5e6f7a8b-9c01-2345-dcab-4567890123de",
        question_id: "feb9aea2-c0a9-48bc-b580-7cdba5cb40bc",
        option: "More than $3000",
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

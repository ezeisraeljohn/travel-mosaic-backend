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
        id: "b2e2e6d3-9e0c-4b0b-8b2e-3e7f4b9b1b2e",
        question_id: "d98721a5-af10-4c73-a667-4e4c9c40a72d",
        option: "Adventure Seeker",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "b2e2e6d3-9e0c-4b0b-8b2e-3e7f4b9b1b2f",
        question_id: "d98721a5-af10-4c73-a667-4e4c9c40a72d",
        option: "Relaxation Enthusiast",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "b2e2e6d3-9e0c-4b0b-8b2e-3e7f4b9b1b2a",
        question_id: "d98721a5-af10-4c73-a667-4e4c9c40a72d",
        option: "Culture Explorer",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "6400e3fc-249a-4483-a7c4-47163e884bd1",
        question_id: "d98721a5-af10-4c73-a667-4e4c9c40a72d",
        option: "Budget-conscious Traveler",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "65223a16-5ada-411f-8f3e-0acc8f3488cb",
        question_id: "d98721a5-af10-4c73-a667-4e4c9c40a72d",
        option: "Luxury Traveler",
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

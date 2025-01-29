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
    const questionnaires = [
      {
        id: "d98721a5-af10-4c73-a667-4e4c9c40a72d",
        question: "What Type Of Traveler Are You?",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "5a84ebaf-5430-4fbb-b028-307450ec88a8",
        question:
          "What Activities or Experiences Do You Prioritize During Your Trip?",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "feb9aea2-c0a9-48bc-b580-7cdba5cb40bc",
        question: "What is Your Typical Budget Per Trip?",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "beadcaee-7d06-4fe8-98dc-caec1fdc383e",
        question: "Do You Prefer Travelling Solo or With Others?",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "39d0d74b-7738-4043-b386-7adad46d0cb7",
        question: "What is Most Important To You When Planning A Trip?",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert(
      "questionnaire_questions",
      questionnaires,
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
    await queryInterface.bulkDelete("questionnaires", null, {});
  },
};

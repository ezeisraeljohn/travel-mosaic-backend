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
        id: "673c49ae-b36c-40dc-929c-29463385ea54",
        question_id: "39d0d74b-7738-4043-b386-7adad46d0cb7",
        option: "Saving Money And Finding Deals",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "f23eab7b-4798-40f5-affc-69100263373c",
        question_id: "39d0d74b-7738-4043-b386-7adad46d0cb7",
        option: "Optimizing Time With Pre-planned Itineraries",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "dd3b1ef7-c035-4ba3-acf0-aad056c039c9",
        question_id: "39d0d74b-7738-4043-b386-7adad46d0cb7",
        option: "Discovering Unique or Hidden Gems",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "4a517850-6da0-4995-9d1c-02e6fc731365",
        question_id: "39d0d74b-7738-4043-b386-7adad46d0cb7",
        option: "Maximizing Comfort And Convenience",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "8e4df2a1-22d6-4296-92ff-57e54acb3bee",
        question_id: "39d0d74b-7738-4043-b386-7adad46d0cb7",
        option: "Safety And Travel Security",
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

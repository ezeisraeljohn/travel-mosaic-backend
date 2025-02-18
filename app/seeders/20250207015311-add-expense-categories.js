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
    await queryInterface.bulkInsert(
      "expense_categories",
      [
        {
          id: "4e6bf30c-e81f-4e59-9601-04add5830437",
          name: "Food",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "9c264b44-8c8d-4231-baca-77f8f22272d4",
          name: "Flight",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "ae41d8d4-3a83-4899-bc03-eb1f75ada3df",
          name: "Drinks",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "13f64b9f-86e4-4287-a561-c68b944248c4",
          name: "Groceries",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
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
  },
};

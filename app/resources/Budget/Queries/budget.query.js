const { Budget } = require("../../../models");

const createBudgetQuery = async (budgetData) => {
  const budget = await Budget.create(budgetData);
  return budget;
};

const getBudgetByTripIdQuery = async (tripId) => {
  const budget = await Budget.findOne({
    where: {
      tripId,
    },
  });
  return budget;
};

module.exports = { createBudgetQuery, getBudgetByTripIdQuery };

const yup = require("yup");

const createBudgetSchema = yup.object().shape({
  tripId: yup.string().required(),
  totalBudget: yup.number().required(),
});

module.exports = { createBudgetSchema };

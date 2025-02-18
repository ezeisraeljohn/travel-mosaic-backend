const logger = require("../../../utils/logger");
const { response } = require("../../../utils/responses");
const { createBudgetService } = require("../Services/budget.service");

const createBudget = async (req, res, next) => {
  try {
    const budget = await createBudgetService(req, res, next);
    response(budget)("Budget")(res);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
module.exports = { createBudget };

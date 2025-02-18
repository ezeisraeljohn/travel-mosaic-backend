const TripError = require("../../../utils/Errors/tripError");
const BudgetError = require("../../../utils/Errors/budgetError");
const logger = require("../../../utils/logger");
const { getTripByIdQuery } = require("../../Trips/Queries/trips.query");
const { returnFromService } = require("../../../utils/responses");
const {
  createBudgetQuery,
  getBudgetByTripIdQuery,
} = require("../Queries/budget.query");

const createBudgetService = async (req, res, next) => {
  try {
    const trip = await getTripByIdQuery(req.body.tripId);
    if (!trip) {
      throw new TripError("Trip not found", 404);
    }
    const existingBudgetForTrip = await getBudgetByTripIdQuery(
      budgetData.tripId
    );
    if (existingBudgetForTrip) {
      throw new BudgetError("Budget already exists for this trip", 400);
    }
    const budget = await createBudgetQuery(budgetData);
    return returnFromService(201)(true)("Budget")(
      "Budget created successfully"
    )(budget);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = { createBudgetService };

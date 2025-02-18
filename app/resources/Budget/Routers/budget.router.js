const { createBudget } = require("../Controllers/budget.controller");
const { createBudgetSchema } = require("../Validators/budget.validator");
const { verifyUserBearer } = require("../../../middlewares/login");
const {
  validate,
  validateQuery,
} = require("../../../middlewares/validateData");

const router = require("express").Router();

router.post(
  "/budgets",
  validate(createBudgetSchema),
  verifyUserBearer,
  createBudget
);

module.exports = router;

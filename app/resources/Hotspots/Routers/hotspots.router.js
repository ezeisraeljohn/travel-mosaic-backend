const { getHotspots } = require("../Controllers/hotspots.controller");
const { Router } = require("express");
const { getHotspotsSchema } = require("../Validators/hotspots.validator");
const { validateQuery } = require("../../../middlewares/validateData");
const { verifyUserBearer } = require("../../../middlewares/login");

const router = Router();

router.get(
  "/hotspots",
  validateQuery(getHotspotsSchema),
  verifyUserBearer,
  getHotspots
);

module.exports = router;

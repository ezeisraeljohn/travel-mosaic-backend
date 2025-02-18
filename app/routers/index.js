const AuthenticationRouter = require("../resources/Authentication/Routers/authentication.router");
const QuestionnaireRouter = require("../resources/Questionnaires/Routers/questionnaire.router");
const CityRouter = require("../resources/Cities/Routers/cities.router");
const HotspotsRouter = require("../resources/Hotspots/Routers/hotspots.router");
const TripRouter = require("../resources/Trips/Routers/trips.router");
const ItineraryRouter = require("../resources/Itineraries/Routers/itinerary.router");
const BudgetRouter = require("../resources/Budget/Routers/budget.router");

const router = (app) => {
  app.use("/api/v1", AuthenticationRouter);
  app.use("/api/v1", QuestionnaireRouter);
  app.use("/api/v1", CityRouter);
  app.use("/api/v1", HotspotsRouter);
  app.use("/api/v1", TripRouter);
  app.use("/api/v1", ItineraryRouter);
  app.use("/api/v1", BudgetRouter);
};

module.exports = router;

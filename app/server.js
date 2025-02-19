const { createServer } = require("http");
const app = require("./application");
const dotenv = require("dotenv");
const logger = require("../app/utils/logger");
dotenv.config();

const { HOST } = process.env;
const PORT = process.env.PORT || 8080;
const server = createServer(app);

server.listen(PORT, () => {
  logger.info(`Server is running on http://${HOST}:${PORT}`);
});

process.on("SIGINT", () => {
  logger.info("Shutting the server down...");
  server.close(() => {
    logger.info("Server has been shut down.");
    process.exit(0);
  });
});

//uncaught Error
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

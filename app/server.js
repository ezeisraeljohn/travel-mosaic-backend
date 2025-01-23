const { createServer } = require("http");
const app = require("./application");
const dotenv = require("dotenv");
const logger = require("../app/utils/logger");
dotenv.config();
const { PORT, HOST } = process.env;

const server = createServer(app);

server.listen(PORT, () => {
  //   console.log(`Server is running on http://${HOST}:${PORT}`);
  logger.info(`Server is running on http://${HOST}:${PORT}`);
});

process.on("SIGINT", () => {
  logger.info("Shutting the server down...");
  server.close(() => {
    logger.info("Server has been shut down.");
    process.exit(0);
  });
});

//uncauth Error
process.on("uncaughtException", (error) => {
  //   console.error("Uncaught Exception:", error);
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

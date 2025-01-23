const { createServer } = require("http");
const app = require("./application");
const dotenv = require("dotenv");

dotenv.config();
const { PORT, HOST } = process.env;

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Shutting the server down...");
  server.close(() => {
    console.log("Server has been shut down.");
    process.exit(0);
  });
});

//uncauth Error
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

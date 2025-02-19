module.exports = {
  apps: [
    {
      name: "travel-mosaic",
      script: "./app/server.js",
      instances: 1,
      exec_mode: "fork", // Corrected value
      watch: true,
      ignore_watch: ["logs"],
      max_restarts: 5,
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 8080,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080,
      },
    },
  ],
};

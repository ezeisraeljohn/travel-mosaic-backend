module.exports = {
  apps: [
    {
      name: "my-node-app1",
      script: "./build/server.js",
      instances: 1,
      exec_mode: "fork", // Corrected value
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 8080,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 80,
      },
    },
  ],
};

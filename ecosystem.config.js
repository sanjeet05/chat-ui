module.exports = {
  apps: [
    {
      name: "reactjs_ui",
      script: "app.js",
      instances: 1,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};

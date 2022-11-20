const { configPath, configSchema } = require("./dist/app.js");
const { loadConfig }  = require("./dist/config/index.js");

module.exports = loadConfig(configPath, configSchema).then((config) => ({
  [config.environment]: {
    dialect: "postgres",
    ...config.postgres,
  },
}));

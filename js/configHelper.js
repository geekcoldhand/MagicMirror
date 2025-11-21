const path = require("path");
const Log = require("logger");
const defaults = require("./defaults");

async function loadConfig() {
  try {
    const configPath = path.resolve(__dirname, "../config/config.js");
    const userConfig = require(configPath);
    
    // Merge user config with defaults
    const config = Object.assign({}, defaults, userConfig);
    
    Log.info("Configuration loaded successfully");
    return config;
  } catch (error) {
    Log.error("Could not load config file:", error);
    Log.info("Using default configuration");
    return defaults;
  }
}

module.exports = { loadConfig };
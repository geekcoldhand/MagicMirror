require("module-alias/register");
require("console-stamp")(console);
const Log = require("logger");
const Server = require("./server");
const { loadConfig } = require("./configHelper");
const { loadModuleHelpers } = require("./moduleLoader");

class App {
  constructor() {
    this.config = null;
    this.server = null;
    this.nodeHelpers = [];
  }
  
  async start() {
    Log.info("Starting MagicMirror²...");
    
    // Load configuration
    this.config = await loadConfig();
    
    // Create server
    this.server = new Server(this.config);
    const { io } = await this.server.open();
    
    // Load module node helpers
    this.nodeHelpers = await loadModuleHelpers(this.config.modules, io);
    
    Log.info("MagicMirror² started successfully!");
  }
  
  async stop() {
    Log.info("Shutting down MagicMirror²...");
    
    // Stop all node helpers
    this.nodeHelpers.forEach(helper => helper.stop());
    
    // Close server
    if (this.server) {
      await this.server.close();
    }
    
    Log.info("MagicMirror² shut down complete");
  }
}

// Start the application
const app = new App();
app.start().catch(error => {
  Log.error("Failed to start MagicMirror²:", error);
  process.exit(1);
});

// Handle shutdown
process.on("SIGINT", async () => {
  await app.stop();
  process.exit(0);
});

module.exports = App;
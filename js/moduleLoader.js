const path = require("path");
const fs = require("fs").promises;
const Log = require("logger");

async function loadModuleHelpers(modules, io) {
  const loadedHelpers = [];
  
  for (const module of modules) {
    const helperPath = path.resolve(
      __dirname,
      `../modules/default/${module.module}/node_helper.js`
    );
    
    try {
      await fs.access(helperPath);
      
      const NodeHelperClass = require(helperPath);
      const nodeHelper = NodeHelperClass.create();
      
      nodeHelper.setName(module.module);
      nodeHelper.setPath(path.dirname(helperPath));
      nodeHelper.setSocketIO(io);
      
      // Setup socket namespace for this module
      io.of(module.module).on("connection", (socket) => {
        socket.on("*", (notification, payload) => {
          nodeHelper.socketNotificationReceived(notification, payload);
        });
      });
      
      nodeHelper.init();
      nodeHelper.start();
      
      loadedHelpers.push(nodeHelper);
      Log.info(`Loaded node helper: ${module.module}`);
    } catch (error) {
      // No node_helper.js for this module - that's okay
      Log.info(`No node helper for: ${module.module}`);
    }
  }
  
  return loadedHelpers;
}

module.exports = { loadModuleHelpers };
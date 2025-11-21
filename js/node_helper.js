const Log = require("logger");

const NodeHelper = {
  loaded: false,
  
  init: function() {
    Log.info(`Initializing node helper: ${this.name}`);
  },
  
  start: function() {
    Log.info(`Starting node helper: ${this.name}`);
  },
  
  stop: function() {
    Log.info(`Stopping node helper: ${this.name}`);
  },
  
  socketNotificationReceived: function(notification, payload) {
    // Override in module
  },
  
  sendSocketNotification: function(notification, payload) {
    this.io.of(this.name).emit(notification, payload);
  },
  
  setName: function(name) {
    this.name = name;
  },
  
  setPath: function(path) {
    this.path = path;
  },
  
  setSocketIO: function(io) {
    this.io = io;
  }
};

const create = function(moduleDefinition) {
  return Object.assign(Object.create(NodeHelper), moduleDefinition);
};

module.exports = { create };
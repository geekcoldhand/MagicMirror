const Module = {
  name: null,
  identifier: null,
  hidden: false,
  config: {},
  data: {},
  
  init: function() {
    // Override in module
  },
  
  start: function() {
    console.log(`Starting module: ${this.name}`);
  },
  
  getDom: function() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.name;
    return wrapper;
  },
  
  getHeader: function() {
    return this.data.header;
  },
  
  notificationReceived: function(notification, payload, sender) {
    // Override in module
  },
  
  socketNotificationReceived: function(notification, payload) {
    // Override in module
  },
  
  suspend: function() {
    this.hidden = true;
  },
  
  resume: function() {
    this.hidden = false;
  },
  
  hide: function(speed, callback) {
    this.hidden = true;
    this.updateDom(speed);
    if (callback) callback();
  },
  
  show: function(speed, callback) {
    this.hidden = false;
    this.updateDom(speed);
    if (callback) callback();
  },
  
  updateDom: function(speed) {
    MM.updateModule(this, speed);
  },
  
  sendNotification: function(notification, payload) {
    MM.sendNotification(notification, payload, this);
  },
  
  sendSocketNotification: function(notification, payload) {
    if (!this.socket) {
      this.socket = new MMSocket(this.name);
    }
    this.socket.sendNotification(notification, payload);
  }
};

Module.definitions = {};

Module.register = function(name, moduleDefinition) {
  console.log(`Registering module: ${name}`);
  Module.definitions[name] = moduleDefinition;
};

Module.create = function(name) {
  if (!Module.definitions[name]) {
    return null;
  }
  
  const definition = Object.assign({}, Module.definitions[name]);
  const ModuleClass = Object.assign(Object.create(Module), definition);
  
  ModuleClass.name = name;
  ModuleClass.init();
  
  return ModuleClass;
};

window.Module = Module;
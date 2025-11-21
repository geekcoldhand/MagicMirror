class MMSocket {
  constructor(moduleName) {
    this.moduleName = moduleName;
    this.socket = io(`/${moduleName}`, {
      transports: ["websocket"]
    });
    
    this.socket.on("connect", () => {
      console.log(`Socket connected for ${moduleName}`);
    });
    
    this.socket.onAny((notification, payload) => {
      const module = MM.getModuleByName(moduleName);
      if (module) {
        module.socketNotificationReceived(notification, payload);
      }
    });
  }
  
  sendNotification(notification, payload = {}) {
    this.socket.emit(notification, payload);
  }
}

window.MMSocket = MMSocket;
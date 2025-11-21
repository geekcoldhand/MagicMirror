const Loader = {
  loadedModules: [],
  
  async loadModules() {
    const config = await this.getConfig();
    
    for (const moduleConfig of config.modules) {
      await this.loadModule(moduleConfig);
    }
    
    console.log("All modules loaded");
  },
  
  async getConfig() {
    const response = await fetch("/config");
    return response.json();
  },
  
  async loadModule(moduleConfig) {
    const modulePath = `/modules/default/${moduleConfig.module}/${moduleConfig.module}.js`;
    
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = modulePath;
      script.onload = () => {
        const module = Module.create(moduleConfig.module);
        if (module) {
          module.identifier = `${moduleConfig.module}_${this.loadedModules.length}`;
          module.config = moduleConfig.config || {};
          module.data = {
            position: moduleConfig.position || "top_left",
            header: moduleConfig.header || ""
          };
          
          this.loadedModules.push(module);
          module.start();
        }
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  },
  
  getLoadedModules() {
    return this.loadedModules;
  }
};

window.Loader = Loader;
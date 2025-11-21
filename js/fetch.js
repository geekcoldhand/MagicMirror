const fetch = require("node-fetch");
const Log = require("logger");

class Fetcher {
  constructor() {
    this.fetchTimeout = 5000;
  }

  async fetch(url, options = {}) {
    const timeout = options.timeout || this.fetchTimeout;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      Log.error("Fetch error:", error);
      throw error;
    }
  }
}

module.exports = new Fetcher();
const colors = require("colors/safe");

const Logger = {
  log: function(...args) {
    console.log(...args);
  },
  
  info: function(...args) {
    console.log(colors.blue("[INFO]"), ...args);
  },
  
  warn: function(...args) {
    console.log(colors.yellow("[WARN]"), ...args);
  },
  
  error: function(...args) {
    console.error(colors.red("[ERROR]"), ...args);
  }
};

module.exports = Logger;
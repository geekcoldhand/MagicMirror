const express = require("express");
const http = require("http");
const https = require("https");
const socketio = require("socket.io");
const helmet = require("helmet");
const { IpFilter } = require("express-ipfilter");
const path = require("path");
const fs = require("fs");
const Log = require("logger");

function Server(config) {
  const app = express();
  
  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: false
  }));
  
  // IP filtering
  if (config.ipWhitelist && config.ipWhitelist.length > 0) {
    app.use(IpFilter(config.ipWhitelist, {
      mode: "allow",
      log: false
    }));
  }
  
  // Create HTTP/HTTPS server
  let server;
  if (config.useHttps) {
    const options = {
      key: fs.readFileSync(config.httpsPrivateKey),
      cert: fs.readFileSync(config.httpsPublicCert)
    };
    server = https.createServer(options, app);
  } else {
    server = http.createServer(app);
  }
  
  // Socket.IO setup
  const io = socketio(server, {
    cors: {
      origin: "*"
    }
  });
  
  // Serve static files
  app.use("/js", express.static(path.resolve(__dirname)));
  app.use("/css", express.static(path.resolve(__dirname, "../css")));
  app.use("/vendor", express.static(path.resolve(__dirname, "../vendor")));
  app.use("/modules", express.static(path.resolve(__dirname, "../modules")));
  app.use("/translations", express.static(path.resolve(__dirname, "../translations")));
  
  // Root route
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../index.html"));
  });
  
  // Config route
  app.get("/config", (req, res) => {
    res.json(config);
  });
  
  // Start server
  this.open = function() {
    return new Promise((resolve) => {
      server.listen(config.port, config.address, () => {
        Log.info(`Server running on http://${config.address}:${config.port}`);
        resolve({ app, io, server });
      });
    });
  };
  
  this.close = function() {
    return new Promise((resolve) => {
      server.close(() => {
        Log.info("Server closed");
        resolve();
      });
    });
  };
}

module.exports = Server;
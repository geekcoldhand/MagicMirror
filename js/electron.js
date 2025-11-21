"use strict";
require("module-alias/register"); 

const electron = require("electron");
const { app, BrowserWindow } = electron;
const path = require("path");

// Start the Node.js app
require("./app");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 1920,
    x: 0,
    y: 0,
    darkTheme: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    },
    fullscreen: true,
    autoHideMenuBar: true,
    frame: false
  });
  
  // Load the app
  mainWindow.loadURL("http://localhost:8080");
  
  // Open DevTools in development
  if (process.argv.includes("dev")) {
    mainWindow.webContents.openDevTools();
  }
  
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  // Wait for server to start
  setTimeout(createWindow, 3000);
});

app.on("window-all-closed", () => {
  app.quit();
});
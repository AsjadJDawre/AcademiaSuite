const { app, BrowserWindow } = require('electron');
const path = require('path');
require('./dbmgr')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // Enable context isolation
      enableRemoteModule: false, // Disable remote module for security
      nodeIntegration: false // Disable node integration for security
    }
  });

  win.loadURL('http://localhost:3000'); 
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

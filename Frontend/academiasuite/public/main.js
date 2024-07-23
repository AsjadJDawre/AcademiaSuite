const { app, BrowserWindow } = require('electron');
const path = require('path');
require('./dbmgr')
 
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // This is required for contextBridge to work
      enableRemoteModule: false, // Disable remote module
    }
  });

  win.loadURL('http://localhost:3000'); // Or your file URL if using a local file
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

 

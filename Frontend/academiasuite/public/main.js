const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../../Backend/db/database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database opened successfully');
  }
});

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

ipcMain.handle('fetch-data', async (event) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM subject_master', (err, rows) => {
      if (err) {
        console.error('Error fetching data:', err);
        reject(err);
      } else {
        console.log('Fetched data:', rows);
        resolve(rows);
      }
    });
  });
});

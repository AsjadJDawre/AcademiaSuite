const { ipcMain } = require('electron');
 
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../../Backend/db/database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database opened successfully');
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
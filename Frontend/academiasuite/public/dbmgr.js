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
        resolve(rows);
      }
    });
  });
});

console.log('dbmgr loaded and handlers registered');

// Adding new subject
ipcMain.handle('save-data', async (event, formData) => {
  try {
    const { year, pattern, semester, subject, branch, course_credit } = formData;

    const sql = `INSERT INTO subject_master (year, pattern, semester, subject, branch, course_credit) VALUES (?, ?, ?, ?, ?, ?)`;

    // Execute the query
    return new Promise((resolve, reject) => {
      db.run(sql, [year, pattern, semester, subject, branch, course_credit], function (err) {
        if (err) {
          console.error('Error inserting data:', err.message);
          reject(err);
        } else {
          console.log(`Data inserted with rowid ${this.lastID}`);
          resolve({ id: this.lastID });
        }
      });
    });
  } catch (err) {
    console.error('Error handling save-data:', err.message);
    throw err;
  }
});

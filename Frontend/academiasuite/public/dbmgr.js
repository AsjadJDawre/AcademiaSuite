const { ipcMain } = require('electron');
const bcrypt = require('bcrypt');
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

ipcMain.handle('login-user', async (event, {username, password}) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM user WHERE username = ?', [username], (err, row) => {
      if(err) {
        console.log("Database error");
        reject("DE");
      } else if (!row) {
        console.log("User not found");
        resolve("UNF");
      } else {
        bcrypt.compare(password, row.password, (err, result) => {
          if(result) {
            console.log("Login successful");
            resolve("LS");
          } else {
            console.log("Invalid password");
            resolve("IP");
          }
        })
      }
    })
  })
})
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

ipcMain.handle('save-data', async (event, formData) => {
  const { subject, subjectCode } = formData;

  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO subject_master(subject_name, subject_code) VALUES (?, ?)';
    db.run(query, [subject, subjectCode], function (err) {
      if (err) {
        console.log('Error: Cannot save data in DB ::', err);
        resolve({ success: false, error: err.message });
      } else {
        console.log(`${subject} and ${subjectCode} inserted into table`);
        resolve({ success: true });
      }
    });
  });
});

ipcMain.handle('delete-subject', async (event, subject_name) => {
  return new Promise((resolve, reject) => {
    if (!subject_name) {
      reject(new Error('Subject name is required'));
      return;
    }

    const query = 'DELETE FROM subject_master WHERE subject_name = ?';
    db.run(query, [subject_name], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ success: true, changes: this.changes });
      }
    });
  });
});
ipcMain.handle('save-subject', async (event, subjectData) => {
  return new Promise((resolve, reject) => {
    console.log('Received subjectData:', subjectData); // Log incoming data

    db.get('SELECT * FROM subject_master WHERE subject_name = ?', [subjectData.subjectName], (err, row) => {
      if (err) {
        console.log("Database error");
        reject("DE"); // Database Error
      } else if (!row) {
        console.log("Subject Not found! Try adding a subject first");
        resolve("SNF"); // Subject Not Found
      } else {
        const sql = `UPDATE subject_master
        SET ese_oom = ?,
            ese_pm = ?,
            ese_res = ?,
            ia_oom = ?,
            ia_pm = ?,
            ia_res = ?
        WHERE subject_name = ?;`;

db.run(sql, [subjectData.eseOutOfMarks1, subjectData.esePassingMarks1, subjectData.eseResolution1, subjectData.iaOutOfMarks1,subjectData.iaPassingMarks1,subjectData.iaResolution1,subjectData.subjectName], function(err) {
if (err) {
   reject("NoUpdate")
}
resolve('Success')
console.log("succesfully Updated");}
);
        

       
      
      }
    });
  });
});


ipcMain.handle('login-user', async (event, { username, password }) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM user WHERE username = ?', [username], (err, row) => {
      if (err) {
        console.log("Database error");
        reject("DE");
      } else if (!row) {
        console.log("User not found");
        resolve("UNF");
      } else {
        bcrypt.compare(password, row.password, (err, result) => {
          if (err) {
            console.log("Error comparing passwords");
            reject("DE");
          } else if (result) {
            console.log("Login successful");
            resolve(row);
          } else {
            console.log("Invalid password");
            resolve("IP");
          }
        });
      }
    });
  });
});

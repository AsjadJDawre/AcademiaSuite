const { ipcMain } = require('electron');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');






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
        console.log('Fetched data:', rows[3]);
        resolve(rows);
      }
    });
  });
});

ipcMain.handle('subject-save', async (event, data) => {
  const { subjectName, subjectCode } = data;

  // Generate a unique ID based on timestamp and random number
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomNum = Math.floor(Math.random() * 1000); // Random number between 0 and 999
  const subject_id = `SUB${timestamp}${randomNum.toString().padStart(3, '0')}`; // Format ID

  console.log('Generated Unique ID:', subject_id);

  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO subject_master(subject_name, subject_code, subject_id) VALUES (?, ?, ?)';
    db.run(query, [subjectName, subjectCode, subject_id], function (err) {
      if (err) {
        console.log('Error: Cannot save data in DB ::', err);
        resolve({ success: false, error: err.message });
      } else {
        console.log(`${subjectName} and ${subjectCode} inserted into table`);
        resolve({ success: true });
      }
    });
  });
});

ipcMain.handle('delete-subject', async (event, subject) => {
  return new Promise((resolve, reject) => {
    if (!subject) {
      reject(new Error('Subject name is required'));
      return;
    }

    const query = `
      DELETE FROM subject_master 
      WHERE subject_name = ? 
        AND ese_oom IS NULL 
        AND ese_pm IS NULL 
        AND ese_res IS NULL 
        AND ia_oom IS NULL 
        AND ia_pm IS NULL 
        AND ia_res IS NULL 
        AND pr_oom IS NULL 
        AND pr_pm IS NULL 
        AND pr_res IS NULL 
        AND or_oom IS NULL 
        AND or_pm IS NULL 
        AND or_res IS NULL 
        AND tw_com IS NULL 
        AND tw_pm IS NULL 
        AND tw_res IS NULL 
        AND opc IS NULL 
        AND h1_credit IS NULL 
        AND h2_credit IS NULL
    `;

    db.run(query, [subject], function (err) {
      if (err) {
        reject(err);
      } else {
        if (this.changes === 0) {
          resolve({ success: true, changes: 0 });
        } else {
          resolve({ success: true, changes: this.changes });
        }
      }
    });
  });
});



ipcMain.handle('save-credits', async (e, data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE subject_master 
      SET 
        year = ?, pattern = ?, semester = ?,branch=?, subject_name = ?, 
        course_credits = ?, h1_credit = ?, h2_credit = ?, ese_oom = ?, ese_pm = ?, ese_res = ?, 
        ia_oom = ?, ia_pm = ?, ia_res = ?, pr_oom = ?, pr_pm = ?, pr_res = ?, 
        tw_com = ?, tw_pm = ?, tw_res = ?, or_oom = ?, or_pm = ?, or_res = ?, opc = ?
      WHERE subject_name = ? AND year  IS NULL  
    `;

    console.log("Data received in backend:", data);

    const params = [
      data.year,
      data.pattern,
      data.semester,
      data.branch,
      data.subject,
      data.courseCredit,
      data.h1Credit,
      data.h2Credit,
      data.eseOom,
      data.esePm,
      data.eseRes,
      data.iaOom,
      data.iaPm,
      data.iaRes,
      data.prOom,
      data.prPm,
      data.prRes,
      data.twOom,
      data.twPm,
      data.twRes,
      data.orOom,
      data.orPm,
      data.orRes,
      data.opc,
      data.subject,

      
    ];

    console.log("Params array:", params);

    db.run(sql, params, (err) => {
      if (err) {
        console.log("No Update: ", err);
        reject(false);
      } else {
        console.log("Successfully Updated");
        resolve(true);
      }
    });
  });
});



ipcMain.handle('update-credits', async (e, data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE subject_master 
      SET 
        year = ?, pattern = ?, semester = ?,branch=?, subject_name = ?, 
        course_credits = ?, h1_credit = ?, h2_credit = ?, ese_oom = ?, ese_pm = ?, ese_res = ?, 
        ia_oom = ?, ia_pm = ?, ia_res = ?, pr_oom = ?, pr_pm = ?, pr_res = ?, 
        tw_com = ?, tw_pm = ?, tw_res = ?, or_oom = ?, or_pm = ?, or_res = ?, opc = ?
      WHERE subject_name = ? AND year = ?
    `;

    console.log("Data received in backend:", data);

    const params = [
      data.year,
      data.pattern,
      data.semester,
      data.branch,
      data.subject,
      data.courseCredit,
      data.h1Credit,
      data.h2Credit,
      data.eseOom,
      data.esePm,
      data.eseRes,
      data.iaOom,
      data.iaPm,
      data.iaRes,
      data.prOom,
      data.prPm,
      data.prRes,
      data.twOom,
      data.twPm,
      data.twRes,
      data.orOom,
      data.orPm,
      data.orRes,
      data.opc,
      data.subject,

      data.year,

      
    ];

    console.log("Params array:", params);

    db.run(sql, params, (err) => {
      if (err) {
        console.log("No Update: ", err);
        reject(false);
      } else {
        console.log("Successfully Updated");
        resolve(true);
      }
    });
  });
});

ipcMain.handle('check-subject', async (event, subjectName) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT COUNT(*) AS count
       FROM subject_master 
       WHERE subject_name = ? 
       AND ese_oom IS NULL 
       AND ese_pm IS NULL 
       AND ese_res IS NULL 
       AND ia_oom IS NULL 
       AND ia_pm IS NULL 
       AND ia_res IS NULL 
       AND pr_oom IS NULL 
       AND pr_pm IS NULL 
       AND pr_res IS NULL 
       AND or_oom IS NULL 
       AND or_pm IS NULL 
       AND or_res IS NULL 
       AND tw_com IS NULL 
       AND tw_pm IS NULL 
       AND tw_res IS NULL 
       AND opc IS NULL 
       AND h1_credit IS NULL 
       AND h2_credit IS NULL`,
      [subjectName],
      (err, rows) => {
        if (err) {
          console.log("Database error:", err);
          reject("DE");
        } else {
          const count = rows[0].count;
          console.log(count);
          
          if (count >= 1) {
            console.log("SF");
            resolve("SF");
          } else {
            console.log("SNF");
            resolve("SNF");
          }
        }
      }
    );
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
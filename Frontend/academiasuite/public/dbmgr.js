const { ipcMain } = require('electron');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');

// Generate a UUID
const id = uuidv4();
console.log('Generated UUID:', id);




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
  const subject_id = id.replace(/-/g, '').substring(0, 5);
  console.log('Truncated ID:', subject_id);


  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO subject_master(subject_name, subject_code,subject_id) VALUES (?, ?,?)';
    db.run(query, [subjectName, subjectCode,subject_id], function (err) {
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


ipcMain.handle('save-credits', async (e, data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE subject_master 
      SET 
        year = ?, pattern = ?, semester = ?,branch=?, subject_name = ?, 
        course_credits = ?, h1_credit = ?, h2_credit = ?, ese_oom = ?, ese_pm = ?, ese_res = ?, 
        ia_oom = ?, ia_pm = ?, ia_res = ?, pr_oom = ?, pr_pm = ?, pr_res = ?, 
        tw_com = ?, tw_pm = ?, tw_res = ?, or_oom = ?, or_pm = ?, or_res = ?, opc = ?
      WHERE subject_name = ? 
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

// group master fetch data
ipcMain.handle('fetch-subject-name-id', async(event, data) => {
  const { year, pattern, branch, semester } = data;
  
  return new Promise((resolve, reject) => {
    const query = 'SELECT subject_name, subject_id FROM subject_master WHERE year = ? AND pattern = ? AND branch = ? AND semester = ?';

    db.all(query,[year, pattern, branch, semester], (err, rows) => {
      if (err) {
        console.error('Error while subjectname and subjectcode fetching data:', err);
        reject(err);
      } else {
        console.log('Fetched data:', rows);
        resolve(rows);
      }
    });
  });
})

 
// group master update subject group name
ipcMain.handle('update-subject-group-name', async (e, data) => {
  const { groupName, subjectIds } = data;

  if (!Array.isArray(subjectIds) || subjectIds.length === 0) {
    return Promise.reject('No subject IDs provided.');
  }

  return new Promise((resolve, reject) => {
    let updatedCount = 0;
    let totalToUpdate = subjectIds.length;
    let completedCount = 0;
    let hasError = false;

    // Step 1: Check if the groupName is already present in any other row
    const checkGroupNameSql = `SELECT COUNT(*) AS count FROM subject_master WHERE subject_group = ?`;

    db.get(checkGroupNameSql, [groupName], (err, result) => {
      if (err) {
        hasError = true;
        console.log("Error checking group name: ", err);
        return reject(false);
      }

      if (result.count > 0) {
        // If groupName is already present in other rows, resolve early
        console.log("Group name already exists in other rows. No updates performed.");
        return resolve("GNAE");
      }

      // Step 2: Check each subjectId and update if applicable
      subjectIds.forEach(subjectId => {
        const checkSql = `SELECT subject_group FROM subject_master WHERE subject_id = ?`;

        db.get(checkSql, [subjectId], (err, row) => {
          if (err) {
            hasError = true;
            console.log(`Error checking subject group for ID ${subjectId}: `, err);
          } else if (row) {
            if (row.subject_group === null || row.subject_group === groupName) {
              // Proceed with the update if the value is NULL or already matches the groupName
              const updateSql = `UPDATE subject_master SET subject_group = ? WHERE subject_id = ?`;

              db.run(updateSql, [groupName, subjectId], (err) => {
                if (err) {
                  hasError = true;
                  console.log(`No Update for ID ${subjectId}: `, err);
                } else {
                  updatedCount++;
                }

                // Check if all operations are complete
                completedCount++;
                if (completedCount === totalToUpdate) {
                  if (hasError) {
                    reject(false);
                  } else {
                    console.log(`Successfully Updated ${updatedCount} rows.`);
                    resolve(true);
                  }
                }
              });
            } else {
              // If subject_group is not NULL and does not match groupName, do not update
              completedCount++;
              if (completedCount === totalToUpdate) {
                if (hasError) {
                  reject(false);
                } else {
                  resolve("ISNNMG");
                }
              }
            }
          } else {
            // No row found for the given subjectId
            completedCount++;
            if (completedCount === totalToUpdate) {
              if (hasError) {
                reject(false);
              } else {
                resolve(true);
              }
            }
          }
        });
      });
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

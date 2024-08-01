const { ipcMain } = require('electron');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const { promises } = require('original-fs');

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
    const query = 'SELECT * FROM subject_master WHERE year = ? AND pattern = ? AND branch = ? AND semester = ?';

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

// for checking data is present for this year or not
ipcMain.handle('fetch-subject-for-this-year', async (event, data) => {
  const { year, pattern, branch, semester } = data;

  const checkAllNullGroups = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT COUNT(*) as count FROM subject_master WHERE year = ? AND pattern = ? AND branch = ? AND semester = ? AND subject_group IS NOT NULL';

      db.get(query, [year, pattern, branch, semester], (err, row) => {
        if (err) {
          console.error('Error while checking null groups:', err);
          reject(err);
        } else {
          resolve(row.count === 0); // If count is 0, all groups are null
        }
      });
    });
  };

  try {
    const allNullGroups = await checkAllNullGroups();
    return allNullGroups;
  } catch (err) {
    return false;
  }
});

ipcMain.handle('check-subject', async (event, subjectName) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM subject_master WHERE subject_name = ?", [subjectName], (err, row) => {
      if (err) {
        console.log("Database error:", err);
        reject("DE");
      } else if (!row) {
        console.log("SNF");
        resolve("SNF");
      } else {
        console.log("SF");
        resolve("SF");
      }
    });
  });
});
 
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
        // const checkSql = `SELECT subject_group FROM subject_master WHERE subject_id = ?`;
        const checkSql = `SELECT subject_group FROM subject_master WHERE id = ?`;

        db.get(checkSql, [subjectId], (err, row) => {
          if (err) {
            hasError = true;
            console.log(`Error checking subject group for ID ${subjectId}: `, err);
          } else if (row) {
            if (row.subject_group === null || row.subject_group === groupName) {
              // Proceed with the update if the value is NULL or already matches the groupName
              // const updateSql = `UPDATE subject_master SET subject_group = ? WHERE subject_id = ?`;
              const updateSql = `UPDATE subject_master SET subject_group = ? WHERE id = ?`;

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


// update group list group master
ipcMain.handle('edit-subject-group-name', async (e, data) => {
  const { groupName, subjectIds, allSubjectIds } = data;
  console.log(subjectIds);
  if (!Array.isArray(subjectIds) || subjectIds.length === 0) {
    return Promise.reject('No subject IDs provided.');
  }

   // Function to update a subject's group
   const updateSubjectGroup = (subjectId, group) => {
    return new Promise((resolve, reject) => {
      // const updateSql = `UPDATE subject_master SET subject_group = ? WHERE subject_id = ?`;
      const updateSql = `UPDATE subject_master SET subject_group = ? WHERE id = ?`;
      db.run(updateSql, [group, subjectId], (err) => {
        if (err) {
          console.log("No Update: ", err);
          reject(err);
        } else {
          console.log("Successfully Updated to", group);
          resolve();
        }
      });
    });
  };

  try {
    // First, set subject_group to null for all subjects in allSubjectIds
    await Promise.all(allSubjectIds.map(subjectId => updateSubjectGroup(subjectId, null)));

    // Then, set subject_group to groupName for subjects in subjectIds
    await Promise.all(subjectIds.map(subjectId => updateSubjectGroup(subjectId, groupName)));

    return true;
  } catch (err) {
    return false;
  }
    
  });

 // pre year group master
  ipcMain.handle('add-pre-year-group', async (e, data) => {
    const { groupName, selectedIds, toYear, fromYear, pattern, branch, semester } = data;
  
    if (!groupName || !Array.isArray(selectedIds) || !selectedIds.length || !toYear || !fromYear) {
      return Promise.reject(new Error('Invalid input data.'));
    }
  
    console.log('Starting update for groupName:', groupName, 'with IDs:', selectedIds);
  
    return new Promise(async (resolve, reject) => {
      try {
        
        // Function to update a subject's group based on the IDs provided
        const updatePreYearSubject = (selectedId) => {
          return new Promise((resolve, reject) => {
            const findFromYearSql = 'SELECT subject_name FROM subject_master WHERE id = ? AND year = ?';
            db.get(findFromYearSql, [selectedId, fromYear], (err, fromYearRow) => {
              if (err) {
                console.error(`Error querying fromYear for ID ${selectedId}:`, err);
                return reject(new Error("Database error querying fromYear."));
              }
              if (!fromYearRow) {
                console.warn(`No data found for previous year with ID ${selectedId}`);
                return reject(new Error("No data found for previous year."));
              }
  
              const { subject_name: subjectName } = fromYearRow;
  
              // Check if the subject for the current year exists
              const checkToYearSql = 'SELECT subject_name FROM subject_master WHERE subject_name = ? AND year = ?';
              db.get(checkToYearSql, [subjectName, toYear], (err, toYearRow) => {
                if (err) {
                  console.error(`Error querying toYear for subject ${subjectName}:`, err);
                  return reject(new Error("Database error querying toYear."));
                }
                if (!toYearRow) {
                  console.warn(`No data found for current year with subject ${subjectName}`);
                  return reject(new Error(`No data found for current year for subject: ${subjectName}`));
                }
  
                // Update the subject group for the current year
                const updateToYearSql = 'UPDATE subject_master SET subject_group = ? WHERE year = ? AND subject_name = ?';
                db.run(updateToYearSql, [groupName, toYear, subjectName], (err) => {
                  if (err) {
                    console.error(`Error updating group for subject ${subjectName}:`, err);
                    return reject(new Error("Database error updating subject group."));
                  }
  
                  console.log(`Successfully updated subject ${subjectName} to group ${groupName}`);
                  resolve(true);
                });
              });
            });
          });
        };
  
        // Run updates for all selected IDs and wait for all promises to complete
        await Promise.all(selectedIds.map(id => updatePreYearSubject(id)));
        resolve(true); // Resolve the promise if all updates succeed
      } catch (err) {
        console.error("Error in 'add-pre-year-group' handler:", err.message);
        reject(err); // Reject the promise with the caught error
      }
    });
  });
  
// for deleting group
ipcMain.handle('delete-group', async(event, data) => {
  const { year, pattern, branch, semester } = data;

  return new Promise((resolve, reject) => {
    const updateSql = 'UPDATE subject_master SET subject_group = ? WHERE year = ? AND pattern = ? AND branch = ? AND semester = ?';
          db.run(updateSql, [null, year, pattern, branch, semester], (err) => {
            if (err) {
              console.error(`Error deleting group`, err);
              return reject(new Error("Error deleting group."));
            }

            console.log(`Successfully deleted group`);
            resolve(true);
          });
  })
})
   


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

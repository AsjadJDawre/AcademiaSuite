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
        console.log("Database error:", err);
        reject("DE"); // Database Error
      } else if (!row) {
        console.log("Subject Not found! Try adding a subject first");
        resolve("SNF"); // Subject Not Found
      } else {
        console.log('Database row:', row); // Log the database row to check column names

        // Set default values for all fields
        const defaults = {
          h1_credit: 0,
          h2_credit: 0,
          ese_oom: 0,
          ese_pm: 0,
          ese_res: 0,
          ia_oom: 0,
          ia_pm: 0,
          ia_res: 0,
          or_oom: 0,
          or_pm: 0,
          or_res: 0,
          pr_oom: 0,
          pr_pm: 0,
          pr_res: 0,
          tw_oom: 0,
          tw_pm: 0,
          tw_res: 0,
          overall_passing_mark: 0
        };

        // Update the defaults with incoming data only if the respective checkbox is checked
        const updatedData = {
          h1_credit: parseInt(subjectData.h1Input1 || defaults.h1_credit, 10),
          h2_credit: parseInt(subjectData.h2Input1 || defaults.h2_credit, 10),
          ese_oom: subjectData.eseChecked1 ? parseInt(subjectData.eseOutOfMarks1 || defaults.ese_oom, 10) : defaults.ese_oom,
          ese_pm: subjectData.eseChecked1 ? parseInt(subjectData.esePassingMarks1 || defaults.ese_pm, 10) : defaults.ese_pm,
          ese_res: subjectData.eseChecked1 ? parseInt(subjectData.eseResolution1 || defaults.ese_res, 10) : defaults.ese_res,
          ia_oom: subjectData.iaChecked1 ? parseInt(subjectData.iaOutOfMarks1 || defaults.ia_oom, 10) : defaults.ia_oom,
          ia_pm: subjectData.iaChecked1 ? parseInt(subjectData.iaPassingMarks1 || defaults.ia_pm, 10) : defaults.ia_pm,
          ia_res: subjectData.iaChecked1 ? parseInt(subjectData.iaResolution1 || defaults.ia_res, 10) : defaults.ia_res,
          or_oom: subjectData.orChecked1 ? parseInt(subjectData.orOutOfMarks1 || defaults.or_oom, 10) : defaults.or_oom,
          or_pm: subjectData.orChecked1 ? parseInt(subjectData.orPassingMarks1 || defaults.or_pm, 10) : defaults.or_pm,
          or_res: subjectData.orChecked1 ? parseInt(subjectData.orResolution1 || defaults.or_res, 10) : defaults.or_res,
          pr_oom: subjectData.prChecked1 ? parseInt(subjectData.prOutOfMarks1 || defaults.pr_oom, 10) : defaults.pr_oom,
          pr_pm: subjectData.prChecked1 ? parseInt(subjectData.prPassingMarks1 || defaults.pr_pm, 10) : defaults.pr_pm,
          pr_res: subjectData.prChecked1 ? parseInt(subjectData.prResolution1 || defaults.pr_res, 10) : defaults.pr_res,
          tw_oom: subjectData.twChecked1 ? parseInt(subjectData.twOutOfMarks1 || defaults.tw_oom, 10) : defaults.tw_oom,
          tw_pm: subjectData.twChecked1 ? parseInt(subjectData.twPassingMarks1 || defaults.tw_pm, 10) : defaults.tw_pm,
          tw_res: subjectData.twChecked1 ? parseInt(subjectData.twResolution1 || defaults.tw_res, 10) : defaults.tw_res,
          overall_passing_mark: parseInt(subjectData.overallPassingCriteria1 || defaults.overall_passing_mark, 10)
        };

        // Construct the SQL update statement
        const sql = `
          UPDATE subject_master SET 
            h1_credit = ?, 
            h2_credit = ?, 
            ese_oom = ?, 
            ese_pm = ?, 
            ese_res = ?, 
            ia_oom = ?, 
            ia_pm = ?, 
            ia_res = ?, 
            or_oom = ?, 
            or_pm = ?, 
            or_res = ?, 
            pr_oom = ?, 
            pr_pm = ?, 
            pr_res = ?, 
            tw_oom = ?, 
            tw_pm = ?, 
            tw_res = ?, 
            overall_passing_mark = ?
          WHERE subject_name = ?;
        `;
        
        const params = [
          updatedData.h1_credit,
          updatedData.h2_credit,
          updatedData.ese_oom,
          updatedData.ese_pm,
          updatedData.ese_res,
          updatedData.ia_oom,
          updatedData.ia_pm,
          updatedData.ia_res,
          updatedData.or_oom,
          updatedData.or_pm,
          updatedData.or_res,
          updatedData.pr_oom,
          updatedData.pr_pm,
          updatedData.pr_res,
          updatedData.tw_oom,
          updatedData.tw_pm,
          updatedData.tw_res,
          updatedData.overall_passing_mark,
          subjectData.subjectName
        ];

        // Log the final SQL query and parameters
        console.log('Final SQL:', sql);
        console.log('Parameters:', params);

        db.run(sql, params, function (err) {
          if (err) {
            console.log("Update error:", err); // Log update error
            reject("NoUpdate");
          } else {
            console.log("Successfully Updated");
            resolve('Success');
          }
        });
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

const express =require('express') 
require('dotenv').config();
const sqlite3=require('sqlite3').verbose()
const cors = require('cors');
const bodyParser = require('body-parser');

// Verbose is used to enable  more detailed logging of SQL statements executed by the SQLite database  for debugging 
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

const db= new sqlite3.Database('db/database.sqlite',(err)=>{
    if(err){
        console.error(err.message);
    }
    else {
        console.log('Connected to the SQLite database.');

    }
});

app.get('/api/data', (req, res) => {
    const sql = 'SELECT * FROM subject_master';
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    });
  });


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  
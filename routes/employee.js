const express = require('express');
const router = express.Router();
const db = require('../db');


//get all user 
router.get('/', (req, res) => {
  const query = 'SELECT * FROM employee';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json(results);
  })
})

//Get user from id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM employee WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json(results);
  })
})

//Query from DATE
router.get('/data',  (req, res) => {
  const { date } = req.query; 
  try {
    const connection =  mysql.createConnection(dbConfig);
    const [results] =  connection.execute(
      `SELECT fs.id, fs.status, fs.days, fs.money, fs.date_stamp, e.name, e.title FROM employee e INNER JOIN food_stamp fs ON e.id = fs.employee_id WHERE fs.date_stamp = ?`,
      [date]
    );
    /* connection.end(); */

    res.json(results);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }  
})




module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db');


//get all user 
router.get('/employee', (req, res) => {
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
router.get('/employee/:id', (req, res) => {
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
router.get('/data/:date', (req, res) => {
  const date = req.params.date;
  const query = 'SELECT fs.id, fs.status, fs.days, fs.money, fs.date_stamp, e.name, e.title FROM employee e INNER JOIN food_stamp fs ON e.id = fs.employee_id WHERE fs.date_stamp = ?' 
  
  db.query(query, [date], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json(results);
  })
})

//minicard
router.get('/minicard/:date', (req, res) => {
  const date = req.params.date;
  const query = 'SELECT SUM(money) AS total_money FROM food_stamp WHERE date_stamp = ?' 
  
  db.query(query, [date], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json(results);
  })
})




module.exports = router;
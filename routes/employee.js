const express = require('express');
const router = express.Router();
const db = require('../db');


//get all user 
router.get('/employee', (req, res) => {
  const query = 'SELECT e.id, e.name, e.title, SUM(f.money) AS total_amount, SUM(f.days) AS total_days FROM employee e JOIN food_stamp f ON e.id = f.employee_id WHERE f.date_stamp BETWEEN "2023-07-20" AND "2023-07-30" GROUP BY e.id, e.name, e.title; ';

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
router.get('/employee/nowtime', (req, res) => {
  
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);
  res.json({ date: currentDate});

})


//Query from DATE
router.get('/data/:date', (req, res) => {
  const date = req.params.date;
  const query = 'SELECT fs.id, fs.status, fs.days, fs.money, SUBSTRING(fs.date_stamp, 1, 10) AS date_only, e.name, e.title FROM employee e INNER JOIN food_stamp fs ON e.id = fs.employee_id WHERE fs.date_stamp = ?' 
  
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
  const query = 'SELECT SUM(money) AS total_date_money FROM food_stamp WHERE date_stamp = ?';
  const querytotal = 'SELECT SUM(money) AS total_money FROM food_stamp';
  const maxtotal = 'SELECT MAX(money) AS max_money FROM food_stamp';
  const mintotal = 'SELECT MIN(money) AS min_money FROM food_stamp';
  

  db.query(query, [date], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    db.query(querytotal, (err, totalResults) => {
      if (err) {
        console.error('Error executing total query:', err);
        res.status(500).json({ error: 'Error executing total query' });
        return;
      }

      db.query(maxtotal, (err, maxResults) => {
        if (err) {
          console.error('Error executing total query:', err);
          res.status(500).json({ error: 'Error executing total query' });
          return;
        }
      db.query(mintotal, (err, minResults) => {
        if (err) {
          console.error('Error executing total query:', err);
          res.status(500).json({ error: 'Error executing total query' });
          return;
        }

      const resultWithTotal = {
        resultByDate: results[0],
        totalMonth: totalResults[0],
        maxRuslts: maxResults[0],
        minRuslts: minResults[0],
      };

      res.json(resultWithTotal);
      })
      });
    });
  });
});




module.exports = router;
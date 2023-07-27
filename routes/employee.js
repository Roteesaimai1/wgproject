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



module.exports = router;